// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBToAqMZnIyT0DSUcQlq1mlBpSehUmry4c",
  authDomain: "srrassignment.firebaseapp.com",
  projectId: "srrassignment",
  storageBucket: "srrassignment.appspot.com",
  messagingSenderId: "967783180463",
  appId: "1:967783180463:web:fbd53b3ee3f656b4e18c5a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth=getAuth();
// Initialize Firestore
const db = getFirestore(app);

export default db;