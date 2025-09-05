// components/Dashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { getAllSchedules, getAllTasks } from '../lib/database';
import ScheduleCard from './cards/ScheduleCard';
import TaskCard from './cards/TaskCard';

// Define TypeScript interfaces for our data
interface Schedule {
  id: string;
  name: string;
  time: string;
  day: string;
  location: string;
  color: string; // Add color for the card accent
}

interface Task {
  id: string;
  title: string;
  courseName: string;
  deadline: string;
  isCompleted: boolean;
}

export default function Dashboard() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName, setUserName] = useState('Budi'); // Placeholder for username

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Fetching data from the mock database
      const allSchedules: Schedule[] = await getAllSchedules();
      const allTasks: Task[] = await getAllTasks();

      // Filter schedules for today
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      setSchedules(allSchedules.filter(schedule => schedule.day === today));

      // Filter and sort upcoming tasks
      const upcoming = allTasks
        .filter(task => !task.isCompleted)
        .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
      setTasks(upcoming);
    };
    fetchDashboardData();
  }, []);

  const handleTaskComplete = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
    // Here you would also update the database:
    // updateTaskCompletion(taskId, !tasks.find(t => t.id === taskId).isCompleted);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Selamat Pagi, {userName}! 👋
        </h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Semoga harimu produktif.
        </p>
      </div>

      {/* Jadwal Hari Ini Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Jadwal Hari Ini</h2>
        {schedules.length > 0 ? (
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {schedules.map((schedule) => (
              <ScheduleCard
                key={schedule.id}
                time={schedule.time}
                courseName={schedule.name}
                location={schedule.location}
                color={schedule.color || 'bg-brand-primary'} // Default color if not provided
              />
            ))}
          </div>
        ) : (
          <p className="text-light-text-secondary dark:text-dark-text-secondary italic">
            Tidak ada jadwal hari ini. Waktunya bersantai!
          </p>
        )}
      </div>

      {/* Tugas Mendatang Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Tugas Mendatang</h2>
        {tasks.filter(t => !t.isCompleted).length > 0 ? (
          <div className="space-y-4">
            {tasks.filter(t => !t.isCompleted).map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                courseName={task.courseName}
                deadline={task.deadline}
                onTaskComplete={handleTaskComplete}
              />
            ))}
          </div>
        ) : (
          <p className="text-light-text-secondary dark:text-dark-text-secondary italic">
            Semua tugas sudah beres. Kerja bagus!
          </p>
        )}
      </div>
    </div>
  );
}