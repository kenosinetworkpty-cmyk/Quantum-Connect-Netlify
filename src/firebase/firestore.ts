import { doc, setDoc } from 'firebase/firestore';
import { db } from '../auth/firebase';

export const saveUserPlan = async (userId: string, planData: any) => {
  const userDocRef = doc(db, 'users', userId);
  await setDoc(userDocRef, planData, { merge: true });
};