import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCvxfbDLhZ6UNrYiLy4oUDs09wUlJ2V30Y",
  authDomain: "flicsy-b0ce3.firebaseapp.com",
  projectId: "flicsy-b0ce3",
  storageBucket: "flicsy-b0ce3.appspot.com",
  messagingSenderId: "53148243304",
  appId: "1:53148243304:web:18253311d9479d348bb2dd"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);