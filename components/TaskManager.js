// components/TaskManager.js

import { useState, useEffect } from 'react';
import { addTask, getAllTasks, updateTask, deleteTask, getAllSchedules } from '../lib/database';

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', deadline: '', courseName: '', isCompleted: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const allTasks = await getAllTasks();
      setTasks(allTasks);
      const allCourses = await getAllSchedules();
      setCourses(allCourses);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask(formData);
    const updatedTasks = await getAllTasks();
    setTasks(updatedTasks);
    setFormData({
      title: '', description: '', deadline: '', courseName: '', isCompleted: false,
    });
  };

  const handleToggleComplete = async (task) => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    await updateTask(updatedTask);
    const updatedTasks = await getAllTasks();
    setTasks(updatedTasks);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    const updatedTasks = await getAllTasks();
    setTasks(updatedTasks);
  };

  const pendingTasks = tasks.filter(task => !task.isCompleted);
  const completedTasks = tasks.filter(task => task.isCompleted);

  return (
    <div>
      <h1>Manajemen Tugas</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Nama Tugas" />
        <select name="courseName" value={formData.courseName} onChange={handleChange} required>
          <option value="">Pilih Mata Kuliah</option>
          {courses.map(course => (
            <option key={course.id} value={course.name}>{course.name}</option>
          ))}
        </select>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Deskripsi Tugas"></textarea>
        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
        <button type="submit">Simpan Tugas</button>
      </form>

      <h3>Tugas Belum Selesai</h3>
      {pendingTasks.length > 0 ? (
        <ul>
          {pendingTasks.map((task) => (
            <li key={task.id}>
              {task.title} ({task.courseName}) - Deadline: {new Date(task.deadline).toLocaleDateString()}
              <input type="checkbox" checked={task.isCompleted} onChange={() => handleToggleComplete(task)} />
              <button onClick={() => handleDelete(task.id)}>Hapus</button>
            </li>
          ))}
        </ul>
      ) : (<p>Tidak ada tugas.</p>)}

      <h3>Tugas Selesai</h3>
      {completedTasks.length > 0 && (
        <ul>
          {completedTasks.map((task) => (
            <li key={task.id}>
              {task.title} ({task.courseName})
              <button onClick={() => handleDelete(task.id)}>Hapus</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}