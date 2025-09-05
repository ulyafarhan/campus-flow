// components/FileManager.js

import { useState, useEffect, useRef } from 'react';
import { addFileMetadata, getAllFileMetadata, deleteFileMetadata } from '../lib/database';

export default function FileManager() {
  const [files, setFiles] = useState([]);
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
        lastModified: uploadedFile.lastModified,
        uploadDate: new Date().toISOString(),
      };
      await addFileMetadata(fileMetadata);
      const updatedFiles = await getAllFileMetadata();
      setFiles(updatedFiles);
    }
  };

  const handleDeleteFile = async (id) => {
    await deleteFileMetadata(id);
    const updatedFiles = await getAllFileMetadata();
    setFiles(updatedFiles);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <h1>Pengelola File</h1>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
      <button onClick={handleUploadClick}>Unggah File Baru</button>

      <h2>Daftar File</h2>
      {files.length > 0 ? (
        <ul>
          {files.map(file => (
            <li key={file.id}>
              {file.name} ({file.type})
              <button onClick={() => handleDeleteFile(file.id)}>Hapus</button>
            </li>
          ))}
        </ul>
      ) : (<p>Tidak ada file yang disimpan.</p>)}
    </div>
  );
}