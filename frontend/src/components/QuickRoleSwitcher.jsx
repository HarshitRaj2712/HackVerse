import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserGraduate, FaCrown, FaGavel, FaUserShield } from 'react-icons/fa';

export const QuickRoleSwitcher = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const role = currentUser.role || 'participant';

  const roleIcons = {
    participant: FaUserGraduate,
    organizer: FaCrown,
    judge: FaGavel,
    admin: FaUserShield,
  };

  const Icon = roleIcons[role] || FaUserGraduate;

  return (
    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-neutral-800 text-xs font-bold text-neutral-200">
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-lime-400/10 text-lime-400">
        <Icon className="w-3 h-3 text-lime-400" />
      </span>
      <span className="text-neutral-400">Role:</span>
      <span className="capitalize font-extrabold text-lime-400">{role}</span>
    </div>
  );
};
