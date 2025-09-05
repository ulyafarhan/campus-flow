// components/AttendanceTracker.js

import { useState, useEffect } from 'react';
import { getAllSchedules, getAllAttendance, recordAttendance } from '../lib/database';
import styles from '../styles/AttendanceTracker.module.css';

export default function AttendanceTracker() {
  const [schedules, setSchedules] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const fetchData = async () => {
    const allSchedules = await getAllSchedules();
    setSchedules(allSchedules);
    const allAttendance = await getAllAttendance();
    setAttendance(allAttendance);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRecordAttendance = async (courseName, status) => {
    const newRecord = {
      courseName,
      status,
      date: new Date().toISOString().split('T')[0],
    };
    await recordAttendance(newRecord);
    fetchData(); // Muat ulang data untuk memperbarui statistik
  };

  const getAttendanceSummary = (courseName) => {
    const courseAttendance = attendance.filter(item => item.courseName === courseName);
    const totalMeetings = courseAttendance.length;
    const hadir = courseAttendance.filter(item => item.status === 'hadir').length;
    const hadirPercentage = totalMeetings > 0 ? (hadir / totalMeetings) * 100 : 0;
    
    return {
      totalMeetings,
      hadir,
      hadirPercentage
    };
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Pelacak Absensi 🧍</h1>
      
      {schedules.length > 0 ? (
        <div className={styles.courseList}>
          {schedules.map(schedule => {
            const summary = getAttendanceSummary(schedule.name);
            return (
              <div key={schedule.id} className={styles.courseCard}>
                <h2 className={styles.courseTitle}>{schedule.name}</h2>
                <div className={styles.summary}>
                  <p>Kehadiran: <strong>{summary.hadir} / {summary.totalMeetings} Pertemuan</strong></p>
                  <div className={styles.progressBarContainer}>
                    <div 
                      className={styles.progressBar} 
                      style={{ width: `${summary.hadirPercentage}%`, backgroundColor: summary.hadirPercentage < 75 ? '#FBBF24' : '#34D399' }}
                    ></div>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button className={styles.actionButton} onClick={() => handleRecordAttendance(schedule.name, 'hadir')}>✅ Hadir</button>
                  <button className={styles.actionButton} onClick={() => handleRecordAttendance(schedule.name, 'sakit')}>😷 Sakit</button>
                  <button className={styles.actionButton} onClick={() => handleRecordAttendance(schedule.name, 'izin')}>✉️ Izin</button>
                  <button className={styles.actionButton} onClick={() => handleRecordAttendance(schedule.name, 'tanpa keterangan')}>❌ Alfa</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
            <p>Anda belum menambahkan jadwal mata kuliah. Silakan tambahkan di halaman Jadwal terlebih dahulu.</p>
        </div>
      )}
    </div>
  );
}