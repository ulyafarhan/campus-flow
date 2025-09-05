// components/SemesterPlanner.js

import { useState, useEffect } from 'react';
import { addSemesterPlan, getAllSemesterPlans } from '../lib/database';

export default function SemesterPlanner() {
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({
    date: '', title: '', type: 'Ujian Tengah Semester',
  });

  useEffect(() => {
    const fetchPlans = async () => {
      const allPlans = await getAllSemesterPlans();
      setPlans(allPlans);
    };
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSemesterPlan(formData);
    const updatedPlans = await getAllSemesterPlans();
    setPlans(updatedPlans);
    setFormData({
      date: '', title: '', type: 'Ujian Tengah Semester',
    });
  };

  return (
    <div>
      <h1>Perencana Semester</h1>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Judul Tanggal Penting" />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="Ujian Tengah Semester">Ujian Tengah Semester</option>
          <option value="Ujian Akhir Semester">Ujian Akhir Semester</option>
          <option value="Deadline Tugas Besar">Deadline Tugas Besar</option>
          <option value="Hari Libur">Hari Libur</option>
          <option value="Lainnya">Lainnya</option>
        </select>
        <button type="submit">Tambah Tanggal</button>
      </form>
      <h2>Daftar Tanggal Penting</h2>
      <ul>
        {plans.map(plan => (
          <li key={plan.id}>
            {plan.date}: {plan.title} ({plan.type})
          </li>
        ))}
      </ul>
    </div>
  );
}