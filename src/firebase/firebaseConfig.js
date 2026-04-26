// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (CONFIG REAL)
const firebaseConfig = {
  apiKey: "AIzaSyDPZgddt5lxWUWIAzPk6efOTGU8li5g_z8",
  authDomain: "beisbol1-7c0b4.firebaseapp.com",
  databaseURL: "https://beisbol1-7c0b4-default-rtdb.firebaseio.com",
  projectId: "beisbol1-7c0b4",
  storageBucket: "beisbol1-7c0b4.firebasestorage.app",
  messagingSenderId: "568527557170",
  appId: "1:568527557170:web:b962befc6fc76d79d1e22b",
  measurementId: "G-YR2F30DEH5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Analytics (solo en navegador)
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : undefined;

// Servicios
export const auth = getAuth(app);
export const db = getFirestore(app);