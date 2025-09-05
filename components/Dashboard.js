// components/Dashboard.js

import { useState, useEffect } from 'react';
import { getAllSchedules, getAllTasks, updateTask } from '../lib/database';
import styles from '../styles/Dashboard.module.css';

// Komponen Card untuk Jadwal
const ScheduleCard = ({ schedule }) => (
  <div className={`${styles.card} ${styles.scheduleCard}`}>
    <span className={styles.scheduleIcon}>🎓</span>
    <div className={styles.scheduleInfo}>
      <h3>{schedule.name}</h3>
      <p>{schedule.time} di {schedule.room} - {schedule.lecturer}</p>
    </div>
  </div>
);

// Komponen Card untuk Tugas
const TaskCard = ({ task, onToggleComplete }) => {
  const handleCheckboxChange = (e) => {
    e.stopPropagation(); // Mencegah event lain terpicu
    onToggleComplete(task);
  };
  
  return (
  <div className={`${styles.card} ${styles.taskCard}`}>
    <div className={styles.taskInfo}>
      <h3>{task.title}</h3>
      <p>{task.courseName}</p>
      <span className={styles.taskDeadline}>
        Deadline: {new Date(task.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
      </span>
    </div>
    <input 
      type="checkbox" 
      className={styles.checkbox} 
      checked={task.isCompleted} 
      onChange={handleCheckboxChange} 
    />
  </div>
)};


export default function Dashboard() {
  const [todaySchedules, setTodaySchedules] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [userName, setUserName] = useState("Mahasiswa"); // Placeholder

  const fetchDashboardData = async () => {
    const allSchedules = await getAllSchedules();
    const allTasks = await getAllTasks();

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const filteredSchedules = allSchedules.filter(schedule => schedule.day === today);
    setTodaySchedules(filteredSchedules);

    const sortedTasks = allTasks
      .filter(task => !task.isCompleted)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 5); // Ambil 5 tugas terdekat
    setUpcomingTasks(sortedTasks);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const handleToggleComplete = async (task) => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    await updateTask(updatedTask);
    // Refresh data untuk memperbarui tampilan
    fetchDashboardData();
  };


  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Halo, {userName}!</h1>
        <p>Jumat, 5 September 2025</p>
      </header>

      <section>
        <h2 className={styles.sectionTitle}>Jadwal Hari Ini</h2>
        <div className={styles.cardList}>
          {todaySchedules.length > 0 ? (
            todaySchedules.map((schedule) => (
              <ScheduleCard key={schedule.id} schedule={schedule} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>Tidak ada jadwal hari ini. Waktunya bersantai!</p>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Tugas Mendatang</h2>
        <div className={styles.cardList}>
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggleComplete={handleToggleComplete}/>
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>Semua tugas sudah beres. Kerja bagus!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}