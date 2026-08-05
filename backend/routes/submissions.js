import express from 'express';
import { Submission } from '../models/Submission.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// ─── 1. Create a new submission (Participant) ─────────────────────────────────
router.post('/', authenticate, async (req, res) => {
  try {
    const {
      title, tagline, description, hackathonId, hackathonTitle,
      teamName, members, repoUrl, demoUrl, videoUrl, techStack, coverImage
    } = req.body;

    const finalRepoUrl = repoUrl || req.body.githubUrl;
    const finalHackathonId = hackathonId || 'hk_1';

    if (!title || !description || !teamName || !finalRepoUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide required fields: title, description, teamName, and GitHub repository URL.',
      });
    }

    const submission = await Submission.create({
      title,
      tagline: tagline || '',
      description,
      hackathonId: finalHackathonId,
      hackathonTitle: hackathonTitle || 'SummerPEP HackVerse 2026',
      teamName,
      members: members || [req.user.fullName],
      submittedBy: req.user._id,
      submitterName: req.user.fullName,
      repoUrl: finalRepoUrl,
      demoUrl: demoUrl || '',
      videoUrl: videoUrl || '',
      techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map(s => s.trim()) : []),
      coverImage: coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    });

    return res.status(201).json({
      success: true,
      message: 'Project submitted successfully!',
      data: submission,
    });
  } catch (error) {
    console.error('Error creating submission:', error);
    return res.status(500).json({ success: false, message: 'Server error while saving submission.' });
  }
});

// ─── 2. Get all submissions (Optionally filter by user or hackathon) ─────────
router.get('/', async (req, res) => {
  try {
    const { hackathonId, userId } = req.query;
    const filter = {};
    if (hackathonId) filter.hackathonId = hackathonId;
    if (userId) filter.submittedBy = userId;

    const submissions = await Submission.find(filter)
      .populate('submittedBy', 'fullName email avatar role')
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return res.status(500).json({ success: false, message: 'Server error while fetching submissions.' });
  }
});

// ─── 3. Get single submission by ID ──────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('submittedBy', 'fullName email avatar role');

    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found.' });
    }

    return res.json({ success: true, data: submission });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Invalid submission ID.' });
  }
});

// ─── 4. Evaluate submission (Judge / Admin) ───────────────────────────────────
router.post('/:id/evaluate', authenticate, authorizeRoles('judge', 'admin'), async (req, res) => {
  try {
    const { innovationScore, technicalScore, impactScore, presentationScore, feedback } = req.body;
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found.' });
    }

    const totalScore = (
      Number(innovationScore || 0) +
      Number(technicalScore || 0) +
      Number(impactScore || 0) +
      Number(presentationScore || 0)
    );

    // Filter out existing score from this judge if re-evaluating
    const existingScores = submission.scores.filter(
      sc => sc.judgeId.toString() !== req.user._id.toString()
    );

    existingScores.push({
      judgeId: req.user._id,
      judgeName: req.user.fullName,
      innovationScore: Number(innovationScore || 0),
      technicalScore: Number(technicalScore || 0),
      impactScore: Number(impactScore || 0),
      presentationScore: Number(presentationScore || 0),
      totalScore,
      feedback: feedback || '',
      evaluatedAt: new Date(),
    });

    submission.scores = existingScores;
    submission.status = 'evaluated';

    // Calculate average score across all judges
    const avgScore = submission.scores.reduce((acc, curr) => acc + curr.totalScore, 0) / submission.scores.length;
    submission.averageScore = Math.round(avgScore * 10) / 10;

    await submission.save();

    return res.json({
      success: true,
      message: 'Evaluation submitted successfully!',
      data: submission,
    });
  } catch (error) {
    console.error('Error evaluating submission:', error);
    return res.status(500).json({ success: false, message: 'Server error while evaluating submission.' });
  }
});

// ─── 5. Delete submission (Submitter or Admin) ──────────────────────────────
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found.' });
    }

    if (submission.submittedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this submission.' });
    }

    await Submission.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Submission deleted.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error while deleting.' });
  }
});

export default router;
