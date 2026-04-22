import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYMNgG59PAlBDYVeP6nXA1mQa1UhbVEyk",
  authDomain: "sneaker-vault-3e957.firebaseapp.com",
  projectId: "sneaker-vault-3e957",
  storageBucket: "sneaker-vault-3e957.firebasestorage.app",
  messagingSenderId: "902371549124",
  appId: "1:902371549124:web:568445fa395083a0c28e91",
  measurementId: "G-XXXXXXXXXX"
};

// Bulletproof initialization
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  console.log("🚀 Firebase Initialized with hardcoded keys.");
} else {
  app = getApp();
}

// Initialize and export Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
