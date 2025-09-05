// src/app/page.tsx
'use client';

import { useState } from 'react';
import Dashboard from '../../components/Dashboard';
import ScheduleManager from '../../components/ScheduleManager';
import TaskManager from '../../components/TaskManager';
import FileManager from '../../components/FileManager';
import AIHelper from '../../components/AIHelper';

// Impor Ikon
import { HomeIcon } from '../../components/icons/HomeIcon';
import { ScheduleIcon } from '../../components/icons/ScheduleIcon';
import { TaskIcon } from '../../components/icons/TaskIcon';
import { FileIcon } from '../../components/icons/FileIcon';
import { AiIcon } from '../../components/icons/AiIcon';

// Impor CSS Module
import styles from '../../styles/Layout.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'schedule': return <ScheduleManager />;
      case 'tasks': return <TaskManager />;
      case 'files': return <FileManager />;
      case 'ai': return <AIHelper />;
      default: return <Dashboard />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: HomeIcon },
    { id: 'schedule', label: 'Jadwal', icon: ScheduleIcon },
    { id: 'tasks', label: 'Tugas', icon: TaskIcon },
    { id: 'files', label: 'File', icon: FileIcon },
    { id: 'ai', label: 'Asisten AI', icon: AiIcon },
  ];

  return (
    <div className={styles.appShell}>
      <main className={styles.mainContent}>
        {renderContent()}
      </main>
      
      <nav className={styles.nav}>
        {navItems.map(item => (
          <button 
            key={item.id} 
            onClick={() => setActiveTab(item.id)} 
            data-active={activeTab === item.id}
            className={styles.navButton}
          >
            <item.icon isActive={activeTab === item.id} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}