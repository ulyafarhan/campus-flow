// components/AIHelper.js

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { getAllSchedules, getAllTasks, getAllFileMetadata, getAllAttendance } from '../lib/database';
import styles from '../styles/AIHelper.module.css';

// Ganti dengan API KEY Gemini Anda. JANGAN DIBUAT PUBLIK DI PROYEK NYATA.
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';

export default function AIHelper() {
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: 'Halo! Ada yang bisa saya bantu? Coba tanyakan "Tugas apa yang deadline minggu ini?"' }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const fileInputRef = useRef(null);
  const chatHistoryRef = useRef(null);
  
  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

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
    if (!userMessage.trim() || loading) return;

    const newUserMessage = { role: 'user', text: userMessage };
    setChatHistory(prev => [...prev, newUserMessage]);
    setUserMessage('');
    setLoading(true);

    try {
      const appData = await fetchAllData();
      const prompt = `Anda adalah asisten cerdas untuk aplikasi manajemen perkuliahan. Berikut adalah data pengguna dalam format JSON: ${JSON.stringify(appData)}. Jawab pertanyaan pengguna berikut berdasarkan data yang diberikan: "${userMessage}". Jika Anda tidak dapat menjawabnya, beri tahu pengguna bahwa data tersebut tidak tersedia. Berikan jawaban dengan format yang mudah dibaca.`;
        
      // Simulasi respons AI (gantilah dengan panggilan API sebenarnya)
      // const response = await axios.post(...)
      // const geminiText = response.data.candidates[0].content.parts[0].text;
      
      // -- HAPUS SIMULASI INI JIKA MENGGUNAKAN API ASLI --
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      const geminiText = `Tentu, berdasarkan data Anda, tugas yang akan datang adalah "Makalah Filsafat Ilmu" yang harus dikumpulkan pada 8 September 2025.`;
      // -- AKHIR SIMULASI --

      setChatHistory(prev => [...prev, { role: 'ai', text: geminiText }]);

    } catch (err) {
      const errorMessage = 'Terjadi kesalahan saat berkomunikasi dengan AI. Pastikan kunci API benar dan ada koneksi internet.';
      setError(errorMessage);
      console.error(err);
      setChatHistory(prev => [...prev, { role: 'ai', text: 'Maaf, saya tidak bisa memproses permintaan Anda saat ini.' }]);
    } finally {
      setLoading(false);
    }
  };
  
  // Fungsi untuk ekstraksi data dari gambar
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setExtractedData(null);
      setError(null);
      
      try {
        // ... Logika panggilan API Gemini Vision Anda di sini ...
        
        // Simulasi hasil ekstraksi
        await new Promise(resolve => setTimeout(resolve, 2000));
        const simulatedData = {
          course_name: "Kalkulus Lanjutan",
          code: "KALK-201",
          tasks: [
            { title: "Tugas 1: Integral", deadline: "2025-10-15" },
            { title: "Kuis 2", deadline: "2025-11-01" }
          ]
        };
        setExtractedData(simulatedData);
        
      } catch (err) {
        setError('Terjadi kesalahan saat memindai dokumen.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    e.target.value = null; // Reset input
  };
  
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Asisten AI 🤖</h1>

      {/* Bagian Ekstraksi Data Otomatis */}
      <div className={styles.featureSection}>
        <h2 className={styles.sectionTitle}>Ekstraksi Data Otomatis</h2>
        <p className={styles.sectionDescription}>Pindai gambar jadwal atau silabus, dan biarkan AI mengisinya untuk Anda.</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
        <button onClick={handleUploadClick} className={styles.primaryButton} disabled={loading}>
          {loading ? 'Memproses...' : 'Pindai Dokumen'}
        </button>
        {error && <p style={{ color: 'red', marginTop: '12px' }}>Error: {error}</p>}
        {extractedData && (
          <div className={styles.extractionResult}>
            <h3>Hasil Ekstraksi:</h3>
            <pre>{JSON.stringify(extractedData, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Bagian Asisten Chat Interaktif */}
      <div className={styles.featureSection}>
        <h2 className={styles.sectionTitle}>Asisten Chat Interaktif</h2>
        <div className={styles.chatWindow}>
          <div className={styles.chatHistory} ref={chatHistoryRef}>
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`${styles.messageBubble} ${msg.role === 'user' ? styles.userMessage : styles.aiMessage}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && msg.role !== 'user' && <div className={`${styles.messageBubble} ${styles.aiMessage}`}>Mengetik...</div>}

          </div>
          <div className={styles.chatInputContainer}>
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tanyakan sesuatu..."
              className={styles.chatInput}
              disabled={loading}
            />
            <button onClick={handleSendMessage} className={styles.sendButton} disabled={loading}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke={loading ? "#9CA3AF" : "#4A90E2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={loading ? "#9CA3AF" : "#4A90E2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}