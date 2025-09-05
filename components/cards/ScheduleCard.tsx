// components/cards/ScheduleCard.tsx
import React from 'react';

// Define the shape of the props for type-safety
interface ScheduleCardProps {
  time: string;
  courseName: string;
  location: string;
  color: string; // e.g., 'bg-blue-200', 'bg-green-200' for the side border
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ time, courseName, location, color }) => {
  return (
    // The main card container with flex layout
    <div className="flex-shrink-0 w-48 bg-light-surface dark:bg-dark-surface rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex items-start space-x-3">
      {/* The colored vertical accent bar */}
      <div className={`w-1 h-full rounded-full ${color}`}></div>

      {/* The content container */}
      <div className="flex flex-col">
        {/* Time */}
        <p className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">{time}</p>

        {/* Course Name */}
        <h3 className="text-md font-semibold text-light-text-primary dark:text-dark-text-primary mt-1">
          {courseName}
        </h3>

        {/* Location */}
        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-2">{location}</p>
      </div>
    </div>
  );
};

export default ScheduleCard;
