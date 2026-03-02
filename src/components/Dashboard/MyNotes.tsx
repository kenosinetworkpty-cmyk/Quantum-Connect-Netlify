import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../auth/AuthContext';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const MyNotes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(collection(db, `users/${user.uid}/notes`), (snapshot) => {
      setNotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  const handleAddNote = async () => {
    if (!user || !newNoteTitle || !newNoteContent) return;
    await addDoc(collection(db, `users/${user.uid}/notes`), {
      title: newNoteTitle,
      content: newNoteContent,
      createdAt: serverTimestamp()
    });
    setNewNoteTitle('');
    setNewNoteContent('');
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Notes</h2>
        <Button onClick={() => setIsModalOpen(true)}>New Note</Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <div key={note.id} className="bg-white p-4 rounded-md shadow-md">
              <h3 className="font-semibold mb-2">{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Note">
        <div className="flex flex-col space-y-4">
          <Input 
            type="text" 
            placeholder="Note title" 
            value={newNoteTitle} 
            onChange={(e) => setNewNoteTitle(e.target.value)} 
          />
          <textarea 
            placeholder="Note content" 
            value={newNoteContent} 
            onChange={(e) => setNewNoteContent(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsModalOpen(false)} variant="secondary">Cancel</Button>
            <Button onClick={handleAddNote}>Create</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyNotes;