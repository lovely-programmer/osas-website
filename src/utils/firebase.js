import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "student-support-c23c6.firebaseapp.com",
  projectId: "student-support-c23c6",
  storageBucket: "student-support-c23c6.appspot.com",
  messagingSenderId: "156979029115",
  appId: "1:156979029115:web:70f80f1c38f1bdf0baaede",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
