// components/FileManager.js

import { useState, useEffect, useRef } from 'react';
import { addFileMetadata, getAllFileMetadata, deleteFileMetadata } from '../lib/database';
import styles from '../styles/FileManager.module.css';

// Helper untuk mendapatkan emoji ikon berdasarkan tipe file
const getFileIcon = (fileType) => {
  if (fileType.startsWith('image/')) return '🖼️';
  if (fileType === 'application/pdf') return '📄';
  if (fileType.includes('document')) return '📝';
  if (fileType.includes('spreadsheet')) return '📊';
  return '📁';
};

// Helper untuk memformat ukuran file
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function FileManager() {
  const [files, setFiles] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const allFiles = await getAllFileMetadata();
      setFiles(allFiles);
    };
    fetchFiles();
  }, []);

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const fileMetadata = {
        name: uploadedFile.name,
        type: uploadedFile.type,
        size: uploadedFile.size,
        uploadDate: new Date().toISOString(),
      };
      await addFileMetadata(fileMetadata);
      const updatedFiles = await getAllFileMetadata();
      setFiles(updatedFiles);
    }
    // Reset file input
    e.target.value = null;
  };

  const handleDeleteFile = async (id) => {
    if (window.confirm("Yakin ingin menghapus file ini?")) {
      await deleteFileMetadata(id);
      const updatedFiles = await getAllFileMetadata();
      setFiles(updatedFiles);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Pengelola File</h1>
      
      <div className={styles.controls}>
        <button onClick={handleUploadClick} className={styles.primaryButton}>
          <span>+</span> Unggah File
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />

        {/* View Toggler */}
        <div className={styles.viewToggle}>
            <button className={styles.toggleButton} data-active={viewMode === 'grid'} onClick={() => setViewMode('grid')}>Grid</button>
            <button className={styles.toggleButton} data-active={viewMode === 'list'} onClick={() => setViewMode('list')}>List</button>
        </div>
      </div>

      {files.length > 0 ? (
        <div className={viewMode === 'grid' ? styles.fileGrid : styles.fileList}>
          {files.map(file => (
            <div key={file.id} className={viewMode === 'grid' ? styles.fileCardGrid : styles.fileCardList}>
              <div className={styles.fileInfo} style={{textAlign: viewMode === 'grid' ? 'center' : 'left'}}>
                {viewMode === 'grid' && <div className={styles.fileIcon}>{getFileIcon(file.type)}</div>}
                <h3>{file.name}</h3>
                <p>{formatFileSize(file.size)}</p>
              </div>
              <button onClick={() => handleDeleteFile(file.id)} className={styles.deleteButton}>
                ×
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
            <p>Belum ada file yang diunggah. Mulai organisir file kuliahmu di sini!</p>
        </div>
      )}
    </div>
  );
}