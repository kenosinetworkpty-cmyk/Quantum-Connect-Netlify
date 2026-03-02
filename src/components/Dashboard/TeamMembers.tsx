import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../auth/AuthContext';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const TeamMembers = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(collection(db, `users/${user.uid}/teamMembers`), (snapshot) => {
      setMembers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  const handleAddMember = async () => {
    if (!user || !newMemberName || !newMemberRole) return;
    await addDoc(collection(db, `users/${user.uid}/teamMembers`), {
      name: newMemberName,
      role: newMemberRole,
      createdAt: serverTimestamp()
    });
    setNewMemberName('');
    setNewMemberRole('');
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Team Members</h2>
        <Button onClick={() => setIsModalOpen(true)}>Add Member</Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : members.length === 0 ? (
        <p>No team members yet.</p>
      ) : (
        <ul className="bg-white rounded-md shadow-md divide-y divide-gray-200">
          {members.map(member => (
            <li key={member.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Team Member">
        <div className="flex flex-col space-y-4">
          <Input 
            type="text" 
            placeholder="Member name" 
            value={newMemberName} 
            onChange={(e) => setNewMemberName(e.target.value)} 
          />
          <Input 
            type="text" 
            placeholder="Member role" 
            value={newMemberRole} 
            onChange={(e) => setNewMemberRole(e.target.value)} 
          />
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsModalOpen(false)} variant="secondary">Cancel</Button>
            <Button onClick={handleAddMember}>Add</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeamMembers;
