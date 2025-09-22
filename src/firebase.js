// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgo9rKiRESQIA22n8wPQZ9DEpj1omI-TM",
  authDomain: "godashboard-7d1d8.firebaseapp.com",
  databaseURL: "https://godashboard-7d1d8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "godashboard-7d1d8",
  storageBucket: "godashboard-7d1d8.appspot.com",
  messagingSenderId: "945136533675",
  appId: "1:945136533675:web:39e351763cbe3c9b43f7ee"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };