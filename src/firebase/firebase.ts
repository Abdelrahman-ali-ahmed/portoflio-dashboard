// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8Ccvhci9Ugz0N5vfFBRNx8VPUECfQ5GA",
  authDomain: "dashboard-landingpage.firebaseapp.com",
  projectId: "dashboard-landingpage",
  storageBucket: "dashboard-landingpage.firebasestorage.app",
  messagingSenderId: "525646529752",
  appId: "1:525646529752:web:d45ff51e0acf995bbd43ad"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);