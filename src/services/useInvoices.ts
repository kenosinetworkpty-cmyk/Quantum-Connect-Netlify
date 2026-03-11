import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../auth/firebase';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Invoice } from '../components/dashboard/invoices/invoiceTypes';

export const useInvoices = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const invoicesCollection = collection(db, 'users', user.uid, 'invoices');
      const q = query(invoicesCollection, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const invoicesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invoice));
        setInvoices(invoicesData);
        setIsLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user]);

  return { invoices, isLoading };
};
