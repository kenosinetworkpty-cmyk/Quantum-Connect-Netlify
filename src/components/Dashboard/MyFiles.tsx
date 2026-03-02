
import React, { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db } from '../../services/firebase';
import { useAuth } from '../../auth/AuthContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Trash, Download, FilePlus } from 'lucide-react';

const MyFiles = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, `users/${user.uid}/files`), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      console.error("Error fetching files:", error);
      setError("Failed to load files.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    const storage = getStorage();
    const storageRef = ref(storage, `user_uploads/${user.uid}/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        setError('Upload failed. Please try again.');
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, `users/${user.uid}/files`), {
            name: selectedFile.name,
            storagePath: storageRef.fullPath,
            downloadURL: downloadURL,
            size: selectedFile.size,
            type: selectedFile.type,
            createdAt: serverTimestamp(),
          });
        } catch (error) {
          console.error("Error saving file metadata:", error);
          setError('Failed to save file information.');
        } finally {
          setUploading(false);
          setIsFileModalOpen(false);
          setSelectedFile(null);
        }
      }
    );
  };

  const handleDelete = async (file: any) => {
    if (!user) return;

    const storage = getStorage();
    const storageRef = ref(storage, file.storagePath);

    try {
      await deleteObject(storageRef);
      await deleteDoc(doc(db, `users/${user.uid}/files`, file.id));
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file.");
    }
  };

  const handleDownload = (file: any) => {
    window.open(file.downloadURL, '_blank');
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Files</h2>
        <Button onClick={() => setIsFileModalOpen(true)}>
          <FilePlus className="mr-2 h-4 w-4" /> Add File
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : files.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You haven't uploaded any files yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-sm">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Size</th>
                <th className="text-right py-3 px-4 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map(file => (
                <tr key={file.id} className="border-b">
                  <td className="py-3 px-4">{file.name}</td>
                  <td className="py-3 px-4">{file.type}</td>
                  <td className="py-3 px-4">{formatBytes(file.size)}</td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleDownload(file)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(file)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <Modal isOpen={isFileModalOpen} onClose={() => setIsFileModalOpen(false)} title="Upload File">
        <div className="flex flex-col space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            disabled={uploading}
          >
            {selectedFile ? selectedFile.name : 'Choose File'}
          </Button>

          {uploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsFileModalOpen(false)} variant="secondary" disabled={uploading}>Cancel</Button>
            <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
              {uploading ? `Uploading... ${Math.round(uploadProgress)}%` : 'Upload'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyFiles;
