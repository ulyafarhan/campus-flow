// components/ScheduleManager.js

import { useState, useEffect } from 'react';
import { addSchedule, getAllSchedules, deleteSchedule } from '../lib/database';

export default function ScheduleManager() {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    name: '', code: '', sks: '', day: 'Senin', time: '', room: '', lecturer: ''
  });

  useEffect(() => {
    const fetchSchedules = async () => {
      const allSchedules = await getAllSchedules();
      setSchedules(allSchedules);
    };
    fetchSchedules();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSchedule(formData);
    const updatedSchedules = await getAllSchedules();
    setSchedules(updatedSchedules);
    setFormData({
      name: '', code: '', sks: '', day: 'Senin', time: '', room: '', lecturer: ''
    });
  };

  const handleDelete = async (id) => {
    await deleteSchedule(id);
    const updatedSchedules = await getAllSchedules();
    setSchedules(updatedSchedules);
  };

  const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  return (
    <div>
      <h1>Manajemen Jadwal</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Nama Mata Kuliah" />
        <input type="text" name="code" value={formData.code} onChange={handleChange} required placeholder="Kode Mata Kuliah" />
        <input type="number" name="sks" value={formData.sks} onChange={handleChange} required placeholder="SKS" />
        <select name="day" value={formData.day} onChange={handleChange} required>
          {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
        </select>
        <input type="text" name="time" value={formData.time} onChange={handleChange} required placeholder="Jam" />
        <input type="text" name="room" value={formData.room} onChange={handleChange} required placeholder="Ruang" />
        <input type="text" name="lecturer" value={formData.lecturer} onChange={handleChange} required placeholder="Dosen" />
        <button type="submit">Simpan Jadwal</button>
      </form>

      <h2>Daftar Jadwal</h2>
      {schedules.length > 0 ? (
        <ul>
          {schedules.map(schedule => (
            <li key={schedule.id}>
              {schedule.name} ({schedule.day}, {schedule.time})
              <button onClick={() => handleDelete(schedule.id)}>Hapus</button>
            </li>
          ))}
        </ul>
      ) : (<p>Belum ada jadwal yang ditambahkan.</p>)}
    </div>
  );
}