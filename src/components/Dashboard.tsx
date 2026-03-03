import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { PageLayout } from './ui/PageLayout';
import { Timeline } from './Timeline';

export const Dashboard: React.FC = () => {
  const [userPlan, setUserPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setUserPlan(docSnap.data());
        }
      }
      setLoading(false);
    };

    fetchUserPlan();
  }, [auth.currentUser, db]);

  if (loading) {
    return <PageLayout title="Dashboard"><div>Loading...</div></PageLayout>;
  }

  return (
    <PageLayout title="Dashboard">
      {userPlan ? (
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Plan</h2>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 mb-8">
            <p><strong>Plan Type:</strong> {userPlan.planType}</p>
            <p><strong>Fibre Type:</strong> {userPlan.fibreType}</p>
            <p><strong>Speed:</strong> {userPlan.speed}</p>
            <p><strong>Price:</strong> R{userPlan.price}</p>
          </div>
          <Timeline installationType={userPlan.installationType} />
        </div>
      ) : (
        <p>No plan found.</p>
      )}
    </PageLayout>
  );
};