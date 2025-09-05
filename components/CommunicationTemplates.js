// components/CommunicationTemplates.js

import { useState } from 'react';

export default function CommunicationTemplates() {
  const [copiedTemplate, setCopiedTemplate] = useState(null);

  const templates = [
    {
      id: 1,
      title: 'Permintaan Bimbingan',
      message: 'Yth. Bapak/Ibu [Nama Dosen], saya [Nama Anda], NIM [NIM Anda]. Mohon maaf mengganggu waktunya. Saya ingin meminta waktu untuk bimbingan terkait mata kuliah/tugas [Nama Mata Kuliah/Tugas]. Kapan Bapak/Ibu bersedia?',
    },
    {
      id: 2,
      title: 'Konfirmasi Kehadiran',
      message: 'Yth. Bapak/Ibu [Nama Dosen], saya [Nama Anda], NIM [NIM Anda]. Mohon izin tidak dapat hadir pada perkuliahan [Nama Mata Kuliah] pada hari [Hari], [Tanggal] dikarenakan [Alasan]. Terima kasih.',
    },
    {
      id: 3,
      title: 'Pertanyaan tentang Tugas',
      message: 'Yth. Bapak/Ibu [Nama Dosen], saya [Nama Anda], NIM [NIM Anda]. Mohon maaf mengganggu. Saya ingin bertanya mengenai [Pertanyaan Anda] terkait tugas [Nama Tugas]. Terima kasih atas bantuannya.',
    },
    {
      id: 4,
      title: 'Ucapkan Terima Kasih',
      message: 'Yth. Bapak/Ibu [Nama Dosen], saya [Nama Anda]. Saya mengucapkan terima kasih banyak atas materi dan bimbingannya pada mata kuliah [Nama Mata Kuliah] semester ini. Semoga Bapak/Ibu selalu sehat.',
    },
  ];

  const handleCopy = (message) => {
    navigator.clipboard.writeText(message)
      .then(() => {
        setCopiedTemplate(message);
        setTimeout(() => setCopiedTemplate(null), 2000); // Reset status setelah 2 detik
      })
      .catch(err => {
        console.error('Gagal menyalin teks: ', err);
      });
  };

  return (
    <div>
      <h1>Template Komunikasi Dosen 📧</h1>
      <p>Kumpulan template pesan yang sopan dan profesional untuk berbagai keperluan.</p>
      
      {copiedTemplate && <p>✓ Teks berhasil disalin!</p>}
      
      <ul>
        {templates.map(template => (
          <li key={template.id}>
            <h3>{template.title}</h3>
            <pre>{template.message}</pre>
            <button onClick={() => handleCopy(template.message)}>Salin Teks</button>
          </li>
        ))}
      </ul>
    </div>
  );
}