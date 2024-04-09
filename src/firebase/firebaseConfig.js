// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3hWVcli9BO8M3QmGUBCVoPO92B39Hjjo",
  authDomain: "pdf-verse-books.firebaseapp.com",
  projectId: "pdf-verse-books",
  storageBucket: "pdf-verse-books.appspot.com",
  messagingSenderId: "4729436710",
  appId: "1:4729436710:web:4c3e2a3b02baa3e5ae04e7",
  measurementId: "G-77QTGXW66G",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
