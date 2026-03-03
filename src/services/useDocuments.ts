import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, onSnapshot, query, orderBy, where, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Document } from '../components/dashboard/documents/documentTypes';
import { DocumentFormValues } from '../components/dashboard/documents/DocumentUploadModal';

export const useDocuments = () => {
  const [user] = useAuthState(auth);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const documentsCollection = collection(db, 'users', user.uid, 'documents');
      const q = query(documentsCollection, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const documentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Document));
        setDocuments(documentsData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const uploadDocument = async (data: DocumentFormValues) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const documentsCollection = collection(db, 'users', user.uid, 'documents');
      await addDoc(documentsCollection, {
        ...data,
        createdAt: new Date(),
      });
    } catch (err) {
      setError('Failed to save document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDocument = async (id: string) => {
    if (!user) return;

    try {
      const documentRef = doc(db, 'users', user.uid, 'documents', id);
      await deleteDoc(documentRef);
    } catch (err) {
      setError('Failed to delete document. Please try again.');
    }
  };

  return { documents, uploadDocument, deleteDocument, isLoading, error };
};
