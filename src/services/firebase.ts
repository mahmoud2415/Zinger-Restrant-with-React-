import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Production Firebase Configuration for Zinger Restrant
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC5NGQQMp4bNzEuokFF7ZqApvNm5sa7mG4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "zinger-restrant.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "zinger-restrant",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "zinger-restrant.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "427013338246",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:427013338246:web:8918921d8f6e68b2b90d07",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-N5K0V5Q97T"
};

// Initialize App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
