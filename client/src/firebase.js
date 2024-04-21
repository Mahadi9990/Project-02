// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "project--2-3839b.firebaseapp.com",
  projectId: "project--2-3839b",
  storageBucket: "project--2-3839b.appspot.com",
  messagingSenderId: "632767681279",
  appId: "1:632767681279:web:7ba1a65eeb3e5a55c732ca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);