// components/AIHelper.js

import { useState, useRef } from 'react';
import axios from 'axios';
import { getAllSchedules, getAllTasks, getAllFileMetadata, getAllAttendance } from '../lib/database';

// Ganti dengan API KEY Gemini Anda. JANGAN DIBUAT PUBLIK DI PROYEK NYATA.
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';

export default function AIHelper() {
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const fileInputRef = useRef(null);

  // Fungsi untuk mendapatkan semua data dari database lokal
  const fetchAllData = async () => {
    const schedules = await getAllSchedules();
    const tasks = await getAllTasks();
    const files = await getAllFileMetadata();
    const attendance = await getAllAttendance();
    
    return { schedules, tasks, files, attendance };
  };

  // Fungsi untuk mengirim pesan ke Gemini AI
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    setLoading(true);
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setUserMessage('');

    try {
      const appData = await fetchAllData();
      const prompt = `Anda adalah asisten cerdas untuk aplikasi manajemen perkuliahan. Berikut adalah data pengguna dalam format JSON: ${JSON.stringify(appData)}. Jawab pertanyaan pengguna berikut berdasarkan data yang diberikan: "${userMessage}". Jika Anda tidak dapat menjawabnya, beri tahu pengguna bahwa data tersebut tidak tersedia. Berikan jawaban dengan format yang mudah dibaca. Contoh: "Tugas yang harus dikerjakan hari ini adalah..."`;
        
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        }
      );
      
      const geminiText = response.data.candidates[0].content.parts[0].text;
      setChatHistory(prev => [...prev, { role: 'ai', text: geminiText }]);

    } catch (err) {
      setError('Terjadi kesalahan saat berkomunikasi dengan AI. Pastikan kunci API benar dan ada koneksi internet.');
      console.error(err);
      setChatHistory(prev => [...prev, { role: 'ai', text: 'Maaf, saya tidak bisa memproses permintaan Anda saat ini. Silakan coba lagi.' }]);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk ekstraksi data dari gambar (tetap sama)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setExtractedData(null);
      setError(null);
      
      try {
        const base64Image = await convertFileToBase64(file);
        const prompt = `Ekstrak informasi penting berikut dari gambar silabus atau jadwal perkuliahan ini: nama mata kuliah, kode, SKS, hari, jam, ruang, nama dosen, dan semua tugas beserta deadline-nya. Berikan hasilnya dalam format JSON. Contoh: {"course_name": "...", "code": "...", "tasks": [{"title": "...", "deadline": "..."}]}`;
        
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [
                  { text: prompt },
                  { inlineData: { mimeType: file.type, data: base64Image } }
                ],
              },
            ],
          }
        );

        const geminiText = response.data.candidates[0].content.parts[0].text;
        try {
          const parsedData = JSON.parse(geminiText.replace(/```json/g, '').replace(/```/g, ''));
          setExtractedData(parsedData);
        } catch (jsonError) {
          setError('Gagal memproses respons AI. Pastikan AI mengembalikan JSON yang valid.');
          console.error(jsonError);
        }
        
      } catch (err) {
        setError('Terjadi kesalahan saat berkomunikasi dengan AI. Pastikan kunci API benar dan ada koneksi internet.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <h1>Asisten AI 🤖</h1>
      <p>Asisten cerdas untuk membantu Anda dengan data perkuliahan.</p>

      {/* Bagian Ekstraksi Data Otomatis */}
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px' }}>
        <h2>Ekstraksi Data Otomatis</h2>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
        <button onClick={handleUploadClick}>Pindai Dokumen dengan AI</button>
        {loading && <p>Memproses dokumen... Mohon tunggu.</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {extractedData && (
          <div>
            <h3>Hasil Ekstraksi</h3>
            <pre>{JSON.stringify(extractedData, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Bagian Asisten Chat Interaktif */}
      <div style={{ border: '1px solid #ccc', padding: '15px' }}>
        <h2>Asisten Chat Interaktif</h2>
        <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #eee', padding: '10px', marginBottom: '10px' }}>
          {chatHistory.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.role === 'user' ? 'right' : 'left', marginBottom: '10px' }}>
              <span style={{ backgroundColor: msg.role === 'user' ? '#4a90e2' : '#f0f0f0', color: msg.role === 'user' ? 'white' : 'black', padding: '8px', borderRadius: '10px' }}>
                {msg.text}
              </span>
            </div>
          ))}
          {loading && <p>AI sedang mengetik...</p>}
        </div>
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Tanyakan sesuatu..."
            style={{ flex: 1, padding: '8px' }}
          />
          <button onClick={handleSendMessage} style={{ padding: '8px 12px' }} disabled={loading}>
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}