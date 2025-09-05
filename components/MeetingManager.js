// components/MeetingManager.js

import { useState, useEffect } from 'react';
import { getAllSchedules, recordMeetingStatus, getAllMeetings } from '../lib/database';

export default function MeetingManager() {
  const [schedules, setSchedules] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [formData, setFormData] = useState({
    scheduleId: '', courseName: '', status: 'Masuk', note: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const allSchedules = await getAllSchedules();
      setSchedules(allSchedules);
      const allMeetings = await getAllMeetings();
      setMeetings(allMeetings);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedSchedule = schedules.find(s => s.id === parseInt(formData.scheduleId));
    if (selectedSchedule) {
      await recordMeetingStatus({
        ...formData,
        courseName: selectedSchedule.name,
        date: new Date().toISOString().split('T')[0],
      });
      const updatedMeetings = await getAllMeetings();
      setMeetings(updatedMeetings);
      setFormData({
        scheduleId: '', courseName: '', status: 'Masuk', note: '',
      });
    }
  };

  return (
    <div>
      <h1>Manajemen Pertemuan Kelas</h1>
      <form onSubmit={handleSubmit}>
        <select name="scheduleId" value={formData.scheduleId} onChange={handleChange} required>
          <option value="">Pilih Mata Kuliah</option>
          {schedules.map(schedule => (
            <option key={schedule.id} value={schedule.id}>{schedule.name}</option>
          ))}
        </select>
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="Masuk">Masuk</option>
          <option value="Dibatalkan">Dibatalkan</option>
          <option value="Diganti Asisten">Diganti Asisten</option>
        </select>
        <textarea name="note" value={formData.note} onChange={handleChange} placeholder="Catatan Tambahan"></textarea>
        <button type="submit">Catat Status Pertemuan</button>
      </form>
      <h2>Riwayat Pertemuan</h2>
      <ul>
        {meetings.map(meeting => (
          <li key={meeting.id}>
            {meeting.courseName} ({meeting.date}): {meeting.status}
          </li>
        ))}
      </ul>
    </div>
  );
}