// components/icons/AiIcon.js
export const AiIcon = ({ isActive }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8V4H8" stroke={isActive ? "#4A90E2" : "#6B7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 12L4 8" stroke={isActive ? "#4A90E2" : "#6B7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16V20H16" stroke={isActive ? "#4A90E2" : "#6B7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 12L20 16" stroke={isActive ? "#4A90E2" : "#6B7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L8 8" stroke={isActive ? "#4A90E2" : "#6B7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 8L12 12" stroke={isActive ? "#4A90E2" : "#6B7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L8 16" stroke={isActive ? "#4A90E2" : "#6B7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L16 16" stroke={isActive ? "#4A90E2" : "#6B7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);