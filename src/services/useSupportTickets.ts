import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SupportTicket } from '../components/dashboard/support/supportTicketTypes';
import { TicketFormValues } from '../components/dashboard/support/CreateTicketModal';

export const useSupportTickets = () => {
  const [user] = useAuthState(auth);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const ticketsCollection = collection(db, 'users', user.uid, 'supportTickets');
      const q = query(ticketsCollection, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ticketsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SupportTicket));
        setTickets(ticketsData);
        setIsLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const createTicket = async (data: TicketFormValues) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const ticketsCollection = collection(db, 'users', user.uid, 'supportTickets');
      await addDoc(ticketsCollection, {
        ...data,
        ticketId: `T${Date.now()}`,
        status: 'open',
        createdAt: new Date(),
        lastUpdated: new Date(),
      });
    } catch (err) {
      setError('Failed to create ticket. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { tickets, createTicket, isLoading, error };
};
