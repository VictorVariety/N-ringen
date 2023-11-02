import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAMLmGV5RwRLpanCSvC2e4sp0KS-FPw9Jg",
  authDomain: "naringen-efd47.firebaseapp.com",
  projectId: "naringen-efd47",
  storageBucket: "naringen-efd47.appspot.com",
  messagingSenderId: "699271668924",
  appId: "1:699271668924:web:1af1bd73cc046cff941cb9",
  measurementId: "G-PCX40ED025",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const googleProvider = new GoogleAuthProvider();
