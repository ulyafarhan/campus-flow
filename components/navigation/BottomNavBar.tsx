// components/navigation/BottomNavBar.tsx
'use client';

import React from 'react';

// Define the shape of the props the component will accept
interface BottomNavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// Define the navigation items
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
  { id: 'schedule', label: 'Jadwal', icon: <CalendarIcon /> },
  { id: 'tasks', label: 'Tugas', icon: <CheckSquareIcon /> },
  { id: 'files', label: 'File', icon: <FolderIcon /> },
  { id: 'ai', label: 'Asisten', icon: <SparkleIcon /> },
];

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-light-surface dark:bg-dark-surface border-t border-gray-200 dark:border-gray-700 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ease-in-out
                ${isActive ? 'text-brand-primary' : 'text-light-text-secondary dark:text-dark-text-secondary'}`}
            >
              <div className={`w-6 h-6 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`}>
                {item.icon}
              </div>
              <span className="text-xs font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

// --- SVG Icon Components (Embedded for simplicity) ---

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
    <line x1="16" x2="16" y1="2" y2="6"></line>
    <line x1="8" x2="8" y1="2" y2="6"></line>
    <line x1="3" x2="21" y1="10" y2="10"></line>
  </svg>
);

const CheckSquareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"></polyline>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
);

const FolderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
);

const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"></path>
    </svg>
);


export default BottomNavBar;
