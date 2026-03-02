import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../auth/AuthContext';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const MyFiles = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');

  useEffect(() => {
    if (!user) return;

    const filesUnsub = onSnapshot(collection(db, `users/${user.uid}/files`), (snapshot) => {
      setFiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    const foldersUnsub = onSnapshot(collection(db, `users/${user.uid}/folders`), (snapshot) => {
      setFolders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => {
      filesUnsub();
      foldersUnsub();
    };
  }, [user]);

  const handleAddFolder = async () => {
    if (!user || !newFolderName) return;
    await addDoc(collection(db, `users/${user.uid}/folders`), {
      name: newFolderName,
      createdAt: serverTimestamp()
    });
    setNewFolderName('');
    setIsFolderModalOpen(false);
  };

  const handleAddFile = async () => {
    if (!user || !newFileName) return;
    await addDoc(collection(db, `users/${user.uid}/files`), {
      name: newFileName,
      createdAt: serverTimestamp(),
      size: 0 // Placeholder for actual file size
    });
    setNewFileName('');
    setIsFileModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Files</h2>
        <div>
          <Button onClick={() => setIsFolderModalOpen(true)} className="mr-2">New Folder</Button>
          <Button onClick={() => setIsFileModalOpen(true)}>Add File</Button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {folders.length === 0 && files.length === 0 ? (
            <p>No files or folders yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {folders.map(folder => (
                <div key={folder.id} className="bg-white p-4 rounded-md shadow-md">
                  <p className="font-semibold">{folder.name}</p>
                </div>
              ))}
              {files.map(file => (
                <div key={file.id} className="bg-white p-4 rounded-md shadow-md">
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-sm text-gray-500">{file.size} bytes</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <Modal isOpen={isFolderModalOpen} onClose={() => setIsFolderModalOpen(false)} title="New Folder">
        <div className="flex flex-col space-y-4">
          <Input 
            type="text" 
            placeholder="Folder name" 
            value={newFolderName} 
            onChange={(e) => setNewFolderName(e.target.value)} 
          />
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsFolderModalOpen(false)} variant="secondary">Cancel</Button>
            <Button onClick={handleAddFolder}>Create</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isFileModalOpen} onClose={() => setIsFileModalOpen(false)} title="Add File">
        <div className="flex flex-col space-y-4">
          <Input 
            type="text" 
            placeholder="File name" 
            value={newFileName} 
            onChange={(e) => setNewFileName(e.target.value)} 
          />
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsFileModalOpen(false)} variant="secondary">Cancel</Button>
            <Button onClick={handleAddFile}>Add</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyFiles;