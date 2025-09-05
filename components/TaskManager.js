// components/TaskManager.js

import { useState, useEffect } from 'react';
import { addTask, getAllTasks, updateTask, deleteTask, getAllSchedules } from '../lib/database';
import styles from '../styles/TaskManager.module.css';
import cardStyles from '../styles/Dashboard.module.css'; // Kita gunakan ulang style card dari Dashboard

// Komponen Card Tugas yang bisa digunakan ulang
const TaskCard = ({ task, onToggleComplete, onDelete }) => {
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    onToggleComplete(task);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <div className={`${cardStyles.card} ${cardStyles.taskCard} ${task.isCompleted ? styles.completedTask : ''}`}>
      <div className={cardStyles.taskInfo}>
        <h3 style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.title}</h3>
        <p>{task.courseName}</p>
        <span className={cardStyles.taskDeadline}>
          Deadline: {new Date(task.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input 
          type="checkbox" 
          className={cardStyles.checkbox} 
          checked={task.isCompleted} 
          onChange={handleCheckboxChange} 
        />
        <button onClick={handleDeleteClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}>Hapus</button>
      </div>
    </div>
  );
};

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', deadline: '', courseName: '', isCompleted: false,
  });

  const fetchData = async () => {
    const allTasks = await getAllTasks();
    setTasks(allTasks);
    const allCourses = await getAllSchedules();
    setCourses(allCourses);
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
    if (!formData.title || !formData.courseName || !formData.deadline) {
      alert("Harap isi semua field yang wajib diisi.");
      return;
    }
    await addTask(formData);
    fetchData(); // Muat ulang data
    setFormData({
      title: '', description: '', deadline: '', courseName: '', isCompleted: false,
    });
  };

  const handleToggleComplete = async (task) => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    await updateTask(updatedTask);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      await deleteTask(id);
      fetchData();
    }
  };

  const pendingTasks = tasks.filter(task => !task.isCompleted).sort((a,b) => new Date(a.deadline) - new Date(b.deadline));
  const completedTasks = tasks.filter(task => task.isCompleted).sort((a,b) => new Date(b.deadline) - new Date(a.deadline));

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Manajemen Tugas</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Nama Tugas" className={styles.input} />
        <select name="courseName" value={formData.courseName} onChange={handleChange} required className={styles.select}>
          <option value="">Pilih Mata Kuliah</option>
          {courses.map(course => (
            <option key={course.id} value={course.name}>{course.name}</option>
          ))}
        </select>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Deskripsi Tugas (Opsional)" className={styles.textarea}></textarea>
        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required className={styles.input} />
        <button type="submit" className={styles.primaryButton}>Simpan Tugas</button>
      </form>

      <section>
        <h2 className={styles.sectionTitle}>Tugas Belum Selesai ({pendingTasks.length})</h2>
        <div className={styles.taskList}>
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggleComplete={handleToggleComplete} onDelete={handleDelete} />
            ))
          ) : (
            <div className={styles.emptyState}><p>Tidak ada tugas yang perlu dikerjakan.</p></div>
          )}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Tugas Selesai ({completedTasks.length})</h2>
        <div className={styles.taskList}>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggleComplete={handleToggleComplete} onDelete={handleDelete} />
            ))
          ) : (
             <div className={styles.emptyState}><p>Belum ada tugas yang selesai.</p></div>
          )}
        </div>
      </section>
    </div>
  );
}