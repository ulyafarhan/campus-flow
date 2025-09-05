// components/LecturerContactManager.js

import { useState, useEffect } from 'react';
import { addLecturerContact, getAllLecturerContacts, deleteLecturerContact } from '../lib/database';

export default function LecturerContactManager() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    const fetchContacts = async () => {
      const allContacts = await getAllLecturerContacts();
      setContacts(allContacts);
    };
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addLecturerContact(formData);
    const updatedContacts = await getAllLecturerContacts();
    setContacts(updatedContacts);
    setFormData({
      name: '',
      phone: '',
      email: '',
    });
  };

  const handleDelete = async (id) => {
    await deleteLecturerContact(id);
    const updatedContacts = await getAllLecturerContacts();
    setContacts(updatedContacts);
  };

  return (
    <div>
      <h1>Direktori Kontak Dosen 📞</h1>
      <p>Simpan informasi kontak dosen yang relevan, terintegrasi dengan jadwal kuliah.</p>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Nama Dosen" />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Nomor Kontak (opsional)" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email Dosen" />
        <button type="submit">Tambah Kontak</button>
      </form>

      <h2>Daftar Kontak</h2>
      {contacts.length > 0 ? (
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>
              <strong>{contact.name}</strong>
              {contact.phone && <p>Telp: {contact.phone}</p>}
              <p>Email: {contact.email}</p>
              <button onClick={() => handleDelete(contact.id)}>Hapus</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Belum ada kontak dosen yang tersimpan.</p>
      )}
    </div>
  );
}