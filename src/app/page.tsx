// src/app/page.tsx
'use client';

import { useState } from 'react';
import Dashboard from '../components/Dashboard';
import ScheduleManager from '../components/ScheduleManager';
import TaskManager from '../components/TaskManager';
import FileManager from '../components/FileManager';
import AIHelper from '../components/AIHelper';
import BottomNavBar from '../components/navigation/BottomNavBar';

// These components are not in the new nav, but we keep them for potential future use
// import AttendanceTracker from '../components/AttendanceTracker';
// import MeetingManager from '../components/MeetingManager';
// import SemesterPlanner from '../components/SemesterPlanner';
// import LecturerContactManager from '../components/LecturerContactManager';
// import CommunicationTemplates from '../components/CommunicationTemplates';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'schedule':
        return <ScheduleManager />;
      case 'tasks':
        return <TaskManager />;
      case 'files':
        return <FileManager />;
      case 'ai':
        return <AIHelper />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/*
        The main content area.
        We add padding to the bottom (pb-20) to ensure content isn't hidden
        by the fixed BottomNavBar (which is 4rem/h-16 + some extra space).
      */}
      <main className="flex-grow p-4 md:p-6 pb-20">
        {renderContent()}
      </main>

      {/* The new, fixed bottom navigation bar */}
      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}