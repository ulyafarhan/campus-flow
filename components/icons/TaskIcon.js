// components/icons/TaskIcon.js
export const TaskIcon = ({ isActive }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 3H21V9" stroke={isActive ? "#4A90E2" : "#6B7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 21H3V15" stroke={isActive ? "#4A90E2" : "#6B7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 3L12 12L3 21" stroke={isActive ? "#4A90E2" : "#6B7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);