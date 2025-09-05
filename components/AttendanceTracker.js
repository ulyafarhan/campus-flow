// components/AttendanceTracker.js

import { useState, useEffect } from 'react';
import { getAllSchedules, getAllAttendance, recordAttendance } from '../lib/database';

export default function AttendanceTracker() {
  const [schedules, setSchedules] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allSchedules = await getAllSchedules();
      setSchedules(allSchedules);
      const allAttendance = await getAllAttendance();
      setAttendance(allAttendance);
    };
    fetchData();
  }, []);

  const handleRecordAttendance = async (courseName, status) => {
    const newRecord = {
      courseName,
      status,
      date: new Date().toISOString().split('T')[0],
    };
    await recordAttendance(newRecord);
    const updatedAttendance = await getAllAttendance();
    setAttendance(updatedAttendance);
  };

  const getAttendanceSummary = (courseName) => {
    const courseAttendance = attendance.filter(item => item.courseName === courseName);
    const totalMeetings = courseAttendance.length;
    const hadir = courseAttendance.filter(item => item.status === 'hadir').length;
    return {
      totalMeetings,
      hadir,
      hadirPercentage: totalMeetings > 0 ? (hadir / totalMeetings) * 100 : 0
    };
  };

  return (
    <div>
      <h1>Pelacak Absensi</h1>
      {schedules.length > 0 ? (
        <ul>
          {schedules.map(schedule => {
            const summary = getAttendanceSummary(schedule.name);
            return (
              <li key={schedule.id}>
                <h2>{schedule.name}</h2>
                <p>Hadir: {summary.hadir} / {summary.totalMeetings} ({summary.hadirPercentage.toFixed(2)}%)</p>
                <button onClick={() => handleRecordAttendance(schedule.name, 'hadir')}>Hadir</button>
                <button onClick={() => handleRecordAttendance(schedule.name, 'sakit')}>Sakit</button>
                <button onClick={() => handleRecordAttendance(schedule.name, 'izin')}>Izin</button>
                <button onClick={() => handleRecordAttendance(schedule.name, 'tanpa keterangan')}>Alfa</button>
              </li>
            );
          })}
        </ul>
      ) : (<p>Silakan tambahkan jadwal mata kuliah terlebih dahulu.</p>)}
    </div>
  );
}