// components/MeetingManager.js

import { useState, useEffect } from 'react';
import { getAllSchedules, recordMeetingStatus, getAllMeetings } from '../lib/database';
import styles from '../styles/MeetingManager.module.css';

const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'Masuk':
      return { backgroundColor: '#D1FAE5', color: '#065F46' };
    case 'Dibatalkan':
      return { backgroundColor: '#FEE2E2', color: '#991B1B' };
    case 'Diganti Asisten':
      return { backgroundColor: '#FEF3C7', color: '#92400E' };
    default:
      return { backgroundColor: '#E5E7EB', color: '#374151' };
  }
};

export default function MeetingManager() {
  const [schedules, setSchedules] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [formData, setFormData] = useState({
    scheduleId: '', courseName: '', status: 'Masuk', note: '',
  });

  const fetchData = async () => {
    const allSchedules = await getAllSchedules();
    setSchedules(allSchedules);
    const allMeetings = await getAllMeetings();
    setMeetings(allMeetings.sort((a,b) => new Date(b.date) - new Date(a.date))); // Urutkan terbaru
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.scheduleId) {
      alert("Pilih mata kuliah terlebih dahulu.");
      return;
    }
    const selectedSchedule = schedules.find(s => s.id === parseInt(formData.scheduleId));
    if (selectedSchedule) {
      await recordMeetingStatus({
        ...formData,
        courseName: selectedSchedule.name,
        date: new Date().toISOString().split('T')[0],
      });
      fetchData(); // Muat ulang data
      setFormData({
        scheduleId: '', courseName: '', status: 'Masuk', note: '',
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Manajemen Pertemuan 🗓️</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <select name="scheduleId" value={formData.scheduleId} onChange={handleChange} required className={styles.select}>
          <option value="">Pilih Mata Kuliah</option>
          {schedules.map(schedule => (
            <option key={schedule.id} value={schedule.id}>{schedule.name}</option>
          ))}
        </select>
        <select name="status" value={formData.status} onChange={handleChange} required className={styles.select}>
          <option value="Masuk">Masuk</option>
          <option value="Dibatalkan">Dibatalkan</option>
          <option value="Diganti Asisten">Diganti Asisten</option>
        </select>
        <textarea name="note" value={formData.note} onChange={handleChange} placeholder="Catatan Tambahan (Opsional)" className={styles.textarea}></textarea>
        <button type="submit" className={styles.primaryButton}>Catat Status Pertemuan</button>
      </form>

      <div>
        <h2>Riwayat Pertemuan</h2>
        <div className={styles.historyList}>
          {meetings.map(meeting => (
            <div key={meeting.id} className={styles.historyItem}>
              <p>
                <strong>{meeting.courseName}</strong>
                <br />
                <span style={{fontSize: '14px', color: 'var(--text-secondary-light)'}}>{new Date(meeting.date).toLocaleDateString('id-ID', {weekday: 'long', day: 'numeric', month: 'long'})}</span>
              </p>
              <span className={styles.statusBadge} style={getStatusBadgeStyle(meeting.status)}>
                {meeting.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}