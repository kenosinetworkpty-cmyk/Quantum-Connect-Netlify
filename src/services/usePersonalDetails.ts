import { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../auth/firebase';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { PersonalDetails } from '../components/dashboard/personal-details/personalDetailsTypes';

export const usePersonalDetails = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const detailsDocRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(detailsDocRef, (doc) => {
        if (doc.exists()) {
          setPersonalDetails(doc.data() as PersonalDetails);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  const updatePersonalDetails = async (data: PersonalDetails) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);
    try {
      const detailsDocRef = doc(db, 'users', user.uid);
      await updateDoc(detailsDocRef, data);
    } catch (err) {
      setError('Failed to update details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { personalDetails, updatePersonalDetails, isLoading, error };
};
