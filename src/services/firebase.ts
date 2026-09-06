import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Production Firebase Configuration for Zinger Restrant
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDFbe0xLbSdwhmvGkMVPPfW8xw7ZAMnBxI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "zinger-restaurant-prod.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "zinger-restaurant-prod",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "zinger-restaurant-prod.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "386612122707",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:386612122707:web:1ee229967cb6854a2fe2a6",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

// Initialize App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
