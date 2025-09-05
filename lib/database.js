// lib/database.js

import { openDB } from 'idb';

const DB_NAME = 'campusflow-db';
const DB_VERSION = 6;

/**
 * Inisialisasi dan membuka database IndexedDB.
 * @returns {Promise<IDBDatabase>} Instance dari database.
 */
export async function getDb() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('schedules')) {
        db.createObjectStore('schedules', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('tasks')) {
        db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('attendance')) {
        db.createObjectStore('attendance', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('meetings')) {
        db.createObjectStore('meetings', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('semester_plan')) {
        db.createObjectStore('semester_plan', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('lecturer_contacts')) {
        db.createObjectStore('lecturer_contacts', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

// ===================================
// FUNGSI UMUM UNTUK SEMUA FITUR
// ===================================

async function addData(storeName, data) {
  const db = await getDb();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.add(data);
  await tx.done;
  console.log(`${storeName} berhasil ditambahkan.`);
}

async function getAllData(storeName) {
  const db = await getDb();
  return db.getAll(storeName);
}

async function updateData(storeName, data) {
  const db = await getDb();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.put(data);
  await tx.done;
  console.log(`${storeName} berhasil diperbarui.`);
}

async function deleteData(storeName, id) {
  const db = await getDb();
  await db.delete(storeName, id);
  console.log(`${storeName} berhasil dihapus.`);
}

// ===================================
// FUNGSI SPESIFIK UNTUK SETIAP FITUR
// ===================================

// Manajemen Jadwal & KRS
export const addSchedule = (data) => addData('schedules', data);
export const getAllSchedules = () => getAllData('schedules');
export const updateSchedule = (data) => updateData('schedules', data);
export const deleteSchedule = (id) => deleteData('schedules', id);

// Manajemen Tugas & Deadline
export const addTask = (data) => addData('tasks', data);
export const getAllTasks = () => getAllData('tasks');
export const updateTask = (data) => updateData('tasks', data);
export const deleteTask = (id) => deleteData('tasks', id);

// Pengelola Catatan & File
export const addFileMetadata = (data) => addData('files', data);
export const getAllFileMetadata = () => getAllData('files');
export const updateFileMetadata = (data) => updateData('files', data);
export const deleteFileMetadata = (id) => deleteData('files', id);

// Pelacak Absensi
export const recordAttendance = (data) => addData('attendance', data);
export const getAllAttendance = () => getAllData('attendance');
export const getAttendanceByCourse = async (courseName) => {
  const allAttendance = await getAllAttendance();
  return allAttendance.filter(item => item.courseName === courseName);
};

// Manajemen Pertemuan Kelas
export const recordMeetingStatus = (data) => addData('meetings', data);
export const getAllMeetings = () => getAllData('meetings');

// Perencana Semester
export const addSemesterPlan = (data) => addData('semester_plan', data);
export const getAllSemesterPlans = () => getAllData('semester_plan');

// Tambahan: Direktori Kontak Dosen
export const addLecturerContact = (data) => addData('lecturer_contacts', data);
export const getAllLecturerContacts = () => getAllData('lecturer_contacts');
export const deleteLecturerContact = (id) => deleteData('lecturer_contacts', id);