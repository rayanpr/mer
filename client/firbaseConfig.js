// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "expense-tracker-b3fba.firebaseapp.com",
  projectId: "expense-tracker-b3fba",
  storageBucket: "expense-tracker-b3fba.firebasestorage.app",
  messagingSenderId: "946259969281",
  appId: "1:946259969281:web:5d0f4f9d5a3b8113394700"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);