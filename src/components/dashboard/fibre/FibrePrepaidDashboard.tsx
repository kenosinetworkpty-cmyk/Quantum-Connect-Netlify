import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FibrePrepaid } from './fibrePrepaidTypes';
import { PrepaidDashboardCard } from './PrepaidDashboardCard';
import { TimelineETA } from './TimelineETA';

const timelineEvents = [
  { name: 'Order Confirmed', status: 'complete' as const },
  { name: 'Installation Scheduled', status: 'complete' as const },
  { name: 'Activation In Progress', status: 'in-progress' as const },
  { name: 'Fibre Active', status: 'pending' as const },
];

export const FibrePrepaidDashboard = () => {
  const [user] = useAuthState(auth);
  const [prepaidData, setPrepaidData] = useState<FibrePrepaid | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const prepaidDocRef = doc(db, 'users', user.uid, 'prepaid', 'summary');
      const unsubscribe = onSnapshot(prepaidDocRef, (doc) => {
        if (doc.exists()) {
          setPrepaidData(doc.data() as FibrePrepaid);
        } else {
          // Handle case where prepaid data doesn't exist
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleTopUp = async () => {
    if (!user || !prepaidData) return;

    setIsLoading(true);
    setError(null);
    try {
      const prepaidDocRef = doc(db, 'users', user.uid, 'prepaid', 'summary');
      await updateDoc(prepaidDocRef, {
        creditsBalance: prepaidData.creditsBalance + 100, // Example top-up amount
        lastTopUpDate: new Date(),
      });
    } catch (err) {
      setError('Failed to top up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = () => {
    // Implement upgrade logic here
    alert('Upgrade functionality not yet implemented.');
  };

  if (!prepaidData) {
    return <p>Loading prepaid data...</p>;
  }

  return (
    <div className="space-y-8">
      <PrepaidDashboardCard
        prepaidData={prepaidData}
        onTopUp={handleTopUp}
        onUpgrade={handleUpgrade}
      />
      <TimelineETA events={timelineEvents} />
      {isLoading && <p>Processing...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
