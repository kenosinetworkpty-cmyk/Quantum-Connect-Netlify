import { getFirestore, doc, setDoc } from 'firebase/firestore';

export const saveUserPlan = async (userId: string, planData: any) => {
  const db = getFirestore();
  const userDocRef = doc(db, 'users', userId);
  await setDoc(userDocRef, planData, { merge: true });
};