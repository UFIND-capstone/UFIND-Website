import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, onSnapshot, doc, setDoc, getDoc, addDoc, getDocs, orderBy } from "firebase/firestore";

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyBvx-ibcGTda8-PAdTN0pCmVO3asmHFGSM",
    authDomain: "ufind-61cf4.firebaseapp.com",
    projectId: "ufind-61cf4",
    storageBucket: "ufind-61cf4.firebasestorage.app",
    messagingSenderId: "576701567159",
    appId: "1:576701567159:web:1f0fe5897d695db34afd32",
    measurementId: "G-BLEB1TVGKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db, collection, query, where, onSnapshot, doc, setDoc, getDoc, addDoc, getDocs, orderBy };
