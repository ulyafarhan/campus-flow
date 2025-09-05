// src/app/page.tsx
'use client';

import { useState } from 'react';
import Dashboard from '../../components/Dashboard';
import ScheduleManager from '../../components/ScheduleManager';
import TaskManager from '../../components/TaskManager';
import FileManager from '../../components/FileManager';
import AttendanceTracker from '../../components/AttendanceTracker';
import MeetingManager from '../../components/MeetingManager';
import SemesterPlanner from '../../components/SemesterPlanner';
import LecturerContactManager from '../../components/LecturerContactManager';
import CommunicationTemplates from '../../components/CommunicationTemplates';
import AIHelper from '../../components/AIHelper';

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
      case 'attendance':
        return <AttendanceTracker />;
      case 'meetings':
        return <MeetingManager />;
      case 'planner':
        return <SemesterPlanner />;
      case 'contacts':
        return <LecturerContactManager />;
      case 'templates':
        return <CommunicationTemplates />;
      default:
      case 'ai':
        return <AIHelper />; 
      case 'default':
        return <Dashboard />;
    }
  };

  return (
    <div>
      <nav style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px' }}>
        <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        <button onClick={() => setActiveTab('schedule')}>Jadwal</button>
        <button onClick={() => setActiveTab('tasks')}>Tugas</button>
        <button onClick={() => setActiveTab('files')}>File</button>
        <button onClick={() => setActiveTab('attendance')}>Absensi</button>
        <button onClick={() => setActiveTab('meetings')}>Pertemuan</button>
        <button onClick={() => setActiveTab('planner')}>Perencana</button>
        <button onClick={() => setActiveTab('contacts')}>Kontak Dosen</button>
        <button onClick={() => setActiveTab('templates')}>Template</button>
        <button onClick={() => setActiveTab('ai')}>Asisten AI</button>
      </nav>
      <main style={{ padding: '20px' }}>
        {renderContent()}
      </main>
    </div>
  );
}