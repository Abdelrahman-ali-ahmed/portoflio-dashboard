// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBUFgM77hnwbKlrpRNHfeXd7K4o5dnwMs",
  authDomain: "portfolio-12cb3.firebaseapp.com",
  projectId: "portfolio-12cb3",
  storageBucket: "portfolio-12cb3.firebasestorage.app",
  messagingSenderId: "327678539765",
  appId: "1:327678539765:web:3aec9c07299dd50b1692bc"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);