'use client';

import { useState, useEffect } from 'react';
// Hapus import CSS module yang lama jika ada
// import styles from '../styles/ScheduleManager.module.css';

// Dummy data agar sesuai dengan referensi visual Anda
const dummyScheduleData = {
  id: 1,
  name: 'Penelitian Kualitatif',
  code: 'PK-501',
  sks: 2,
  lecturer: 'Dr. Eko Prasetyo',
  time: '14:00 - 16:00',
  room: 'Ruang Seminar',
};

// Komponen untuk Kalender Mingguan Ringkas
const WeekCalendar = () => {
  const days = [
    { day: 'Min', date: 31, isPast: true },
    { day: 'Sen', date: 1, isPast: true },
    { day: 'Sel', date: 2, isPast: true },
    { day: 'Rab', date: 3, isPast: true },
    { day: 'Kam', date: 4, isPast: true },
    { day: 'Jum', date: 5, isActive: true },
    { day: 'Sab', date: 6, isPast: false },
  ];

  return (
    <div className="bg-card p-4 rounded-xl shadow-subtle">
      <div className="flex justify-between items-center mb-4">
        <button className="text-muted">&lt;</button>
        <h3 className="font-semibold text-foreground">Agustus 2025</h3>
        <button className="text-muted">&gt;</button>
      </div>
      <div className="flex justify-around text-center">
        {days.map((d) => (
          <div key={d.date} className="space-y-2">
            <span className={`text-sm ${d.isPast ? 'text-muted' : 'text-foreground'}`}>{d.day}</span>
            <span
              className={`block w-8 h-8 leading-8 rounded-full text-sm font-semibold ${
                d.isActive ? 'bg-brand-blue text-white' : d.isPast ? 'text-muted' : 'text-foreground'
              }`}
            >
              {d.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ScheduleManager() {
  // Logika state Anda akan tetap di sini
  // const [schedules, setSchedules] = useState([]);
  // ... useEffect, handlers, etc.

  return (
    <div className="p-4 font-sans relative min-h-screen">
      {/* Header */}
      <div className="text-center py-2 mb-4">
        <h1 className="text-lg font-semibold text-foreground">Jadwal & KRS</h1>
      </div>

      {/* Kalender Mingguan */}
      <WeekCalendar />

      {/* Judul Jadwal Hari Ini */}
      <div className="my-6">
        <h2 className="text-xl font-bold text-foreground">Jadwal untuk Jumat, 5 September</h2>
      </div>

      {/* Kartu Jadwal */}
      <div className="bg-card p-4 rounded-xl shadow-subtle space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-foreground">{dummyScheduleData.name}</h3>
          <span className="text-xs font-semibold bg-light-blue text-brand-blue px-3 py-1 rounded-full">{dummyScheduleData.code}</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted">
          <p className="flex items-center space-x-2">
            <span>🗓️</span>
            <span>{dummyScheduleData.sks} SKS</span>
          </p>
          <p className="flex items-center space-x-2">
            <span>👤</span>
            <span>{dummyScheduleData.lecturer}</span>
          </p>
          <p className="flex items-center space-x-2">
            <span>🕒</span>
            <span>{dummyScheduleData.time}</span>
          </p>
          <p className="flex items-center space-x-2">
            <span>📍</span>
            <span>{dummyScheduleData.room}</span>
          </p>
        </div>
      </div>
      
      {/* Floating Action Button (FAB) */}
      <button
        // onClick={() => /* Logika untuk membuka form tambah jadwal */}
        className="absolute bottom-24 right-6 bg-brand-orange text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-3xl font-light"
      >
        +
      </button>
    </div>
  );
}