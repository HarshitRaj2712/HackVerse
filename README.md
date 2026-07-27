# 🚀 SummerPEP HackVerse Platform

> A modern, full-stack, multi-role hackathon ecosystem built for global developers, organizers, judges, and platform administrators. Features a high-contrast electric lime and pitch-black UI design system.

---

## 🌟 Features & Highlights

### 🎭 Multi-Role Architecture & Quick Switcher
- **Participant Persona**: Explore live hackathons, register, find teammates on the Team Finder board, and submit GitHub repositories & demo videos.
- **Organizer Persona**: Host and manage hackathons, configure rubric criteria, track registration metrics, and set event timelines.
- **Judge Persona**: Access the Evaluation Studio to grade project submissions using transparent multi-criteria scoring rubrics with real-time feedback.
- **Admin Persona**: System-wide platform control, user permissions management, and platform analytics.
- **Interactive Quick Role Switcher**: Switch roles instantly from the top navbar to test and demonstrate all platform capabilities without re-authenticating.

### ⚡ Core Platform Capabilities
- **Explore Hackathons**: Search, filter by domain/track (AI, Web3, GreenTech, IoT), view prize pools, and register with 1-click.
- **Team Matchmaking**: Post skill requests, connect with complementary team members, and manage team sizes.
- **Project Submission Studio**: Submit functional GitHub repositories, pitch video demos, live URLs, and tech stack tags.
- **Leaderboards & Hall of Fame**: View real-time rank breakdowns, judge evaluations, and individual criteria scores.
- **Real-Time Toast & Notification Center**: Built-in notification bell tracking registrations, project approvals, and status updates.

---

## 🎨 Theme & Aesthetic Design System

Designed according to high-contrast modern web principles:
- **Primary Color**: Vivid Electric / Neon Lime Green (`#a3e635` / `bg-lime-400`).
- **Background**: Deep Pitch Black (`#030304` / `#050507`).
- **Containers**: Dark Charcoal (`#0c0c0f`) with thin neutral borders (`border-neutral-800`).
- **Interactive Elements**: Rounded full pill buttons (`rounded-full`), glowing neon badges, and smooth micro-animations.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Toast Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Middleware**: CORS, Dotenv

---

## 📁 Repository Structure

```
SummerPEP/
├── backend/
│   ├── server.js          # Express REST API Server
│   └── package.json       # Backend Dependencies & Scripts
└── frontend/
    ├── src/
    │   ├── components/    # Reusable UI (Navbar, Footer, HackathonCard, QuickRoleSwitcher)
    │   ├── context/       # AuthContext & HackathonContext (State Management)
    │   ├── data/          # Initial Seed Data (Users, Hackathons, Submissions, Teams)
    │   ├── pages/         # Role-based & Feature Pages (Home, Hackathons, Admin, Judge, etc.)
    │   ├── routes/        # App Router configuration
    │   ├── services/      # API Service Layer (Axios)
    │   ├── App.jsx        # Root Layout & Provider Setup
    │   └── index.css      # Custom CSS & Design System Utilities
    ├── index.html
    └── package.json       # Frontend Dependencies & Scripts
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm (v9.x or higher)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/HarshitRaj2712/HackVerse.git
   cd HackVerse
   ```

2. **Setup & Start Backend Server**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   *Backend server will start at `http://localhost:5000`.*

3. **Setup & Start Frontend Application**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   *Frontend application will run at `http://localhost:5173`.*

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Backend Health Check |
| `GET` | `/api/hackathons` | Fetch all live and upcoming hackathons |
| `GET` | `/api/hackathons/:id` | Fetch specific hackathon details |
| `POST` | `/api/hackathons` | Create a new hackathon (Organizer) |
| `GET` | `/api/submissions` | Fetch hackathon project submissions |
| `POST` | `/api/submissions` | Submit project for judging |
| `GET` | `/api/teams` | Fetch team finder listings |
| `POST` | `/api/teams` | Post a new team request |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
