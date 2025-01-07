import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, onSnapshot, doc, setDoc, getDoc, addDoc, getDocs, orderBy } from "firebase/firestore";

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyDCqVyrwxqiDOjFLrKFmgYXP_GbhKmB3Rk",
    authDomain: "ufind-cb187.firebaseapp.com",
    projectId: "ufind-cb187",
    storageBucket: "ufind-cb187.firebasestorage.app",
    messagingSenderId: "448110322191",
    appId: "1:448110322191:web:6e6733b6b727fc8ad2f97a",
    measurementId: "G-PMZTL76CED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db, collection, query, where, onSnapshot, doc, setDoc, getDoc, addDoc, getDocs, orderBy };
