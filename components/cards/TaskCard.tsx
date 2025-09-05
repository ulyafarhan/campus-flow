// components/cards/TaskCard.tsx
'use client';

import React, { useState } from 'react';

interface TaskCardProps {
  id: string;
  title: string;
  courseName: string;
  deadline: string; // Should be an ISO date string
  onTaskComplete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, courseName, deadline, onTaskComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCheckboxClick = () => {
    setIsCompleted(!isCompleted);
    // In a real app, you'd also call a function passed via props to update the parent state
    onTaskComplete(id);
  };

  const getDeadlineInfo = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    today.setHours(0, 0, 0, 0); // Normalize today to the start of the day
    deadlineDate.setHours(0, 0, 0, 0); // Normalize deadline to the start of the day

    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: 'Terlewat', color: 'text-brand-alert' };
    if (diffDays === 0) return { text: 'Hari ini', color: 'text-brand-alert' };
    if (diffDays === 1) return { text: 'Besok', color: 'text-brand-accent' };
    return { text: `${diffDays} hari lagi`, color: 'text-light-text-secondary dark:text-dark-text-secondary' };
  };

  const deadlineInfo = getDeadlineInfo(deadline);

  return (
    <div
      className={`
        flex items-center w-full p-4 rounded-lg shadow-md transition-all duration-300
        ${isCompleted ? 'bg-gray-100 dark:bg-gray-800 opacity-60' : 'bg-light-surface dark:bg-dark-surface hover:shadow-lg'}
      `}
    >
      <button
        onClick={handleCheckboxClick}
        className={`
          flex-shrink-0 w-6 h-6 rounded-md border-2 mr-4 transition-all duration-200
          ${isCompleted ? 'bg-brand-success border-brand-success' : 'border-gray-300 dark:border-gray-600'}
        `}
      >
        {isCompleted && (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </button>

      <div className="flex-grow">
        <p className={`font-semibold ${isCompleted ? 'line-through' : ''}`}>{title}</p>
        <p className={`text-sm text-light-text-secondary dark:text-dark-text-secondary ${isCompleted ? 'line-through' : ''}`}>
          {courseName}
        </p>
      </div>

      <div className={`text-sm font-medium ${deadlineInfo.color}`}>
        {deadlineInfo.text}
      </div>
    </div>
  );
};

export default TaskCard;
