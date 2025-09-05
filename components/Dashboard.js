// components/Dashboard.js

import { useState, useEffect } from 'react';
import { getAllSchedules, getAllTasks } from '../lib/database';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const [todaySchedules, setTodaySchedules] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const allSchedules = await getAllSchedules();
      const allTasks = await getAllTasks();

      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      const filteredSchedules = allSchedules.filter(schedule => schedule.day === today);
      setTodaySchedules(filteredSchedules);

      const sortedTasks = allTasks
        .filter(task => !task.isCompleted)
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 5);
      setUpcomingTasks(sortedTasks);
    };
    fetchDashboardData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Jadwal Hari Ini</h3>
      {todaySchedules.length > 0 ? (
        <ul>
          {todaySchedules.map((schedule) => (
            <li key={schedule.id}>
              {schedule.name} ({schedule.time})
            </li>
          ))}
        </ul>
      ) : (<p>Tidak ada jadwal hari ini.</p>)}

      <h3>Tugas Mendatang</h3>
      {upcomingTasks.length > 0 ? (
        <ul>
          {upcomingTasks.map((task) => (
            <li key={task.id}>
              {task.title} (Deadline: {new Date(task.deadline).toLocaleDateString()})
            </li>
          ))}
        </ul>
      ) : (<p>Semua tugas beres!</p>)}
    </div>
  );
}