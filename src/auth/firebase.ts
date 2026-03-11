import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 1. Add this import

const firebaseConfig = {
  apiKey: "AIzaSyD0-rYivQrTtgrRgFMUF4ZkVCYlVTjfcZ0",
  authDomain: "quantum-co-app-23623772-64b05.firebaseapp.com",
  projectId: "quantum-co-app-23623772-64b05",
  storageBucket: "quantum-co-app-23623772-64b05.firebasestorage.app",
  messagingSenderId: "863119988577",
  appId: "1:863119988577:web:ee0758833fabe9976d5720"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // 2. Initialize auth

export { db, auth }; // 3. Export both