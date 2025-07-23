// src/firebase.js

// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // for authentication
import { getFirestore } from "firebase/firestore"; // if using Firestore database
import { getStorage } from "firebase/storage"; // if using storage for file upload

// Firebase config (your credentials)
const firebaseConfig = {
  apiKey: "AIzaSyAJfsB6njcNYhqIO3jhZQ7YnexS4g40ni4",
  authDomain: "vastrikaauth.firebaseapp.com",
  projectId: "vastrikaauth",
  storageBucket: "vastrikaauth.firebasestorage.app",
  messagingSenderId: "188009374242",
  appId: "1:188009374242:web:cfbe9f9bb769ff9922e07b",
  measurementId: "G-RJH7HJ6LK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export needed services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
