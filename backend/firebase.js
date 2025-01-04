<<<<<<< HEAD
import { initializeApp } from 'firebase/app';
import config from './config.js';

const firebaseApp = initializeApp(config.firebaseConfig);
export default firebaseApp;
=======
// firebase.js
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();


const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, '\n');  // Ensure newlines are properly formatted
const privateKeyId = process.env.PRIVATE_KEY_ID;
const clientEmail = process.env.CLIENT_EMAIL;
const clientId = process.env.CLIENT_ID;
const clientCertUrl = process.env.CLIENT_CERT_URL

// Initialize Firebase Admin with your service account
const serviceAccount = {
    "type": "service_account",
    "project_id": "ufind-cb187",
    "private_key_id": privateKeyId,
    "private_key": privateKey,
    "client_email": clientEmail,
    "client_id": clientId,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": clientCertUrl,
    "universe_domain": "googleapis.com"
  }
  

  const adminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  export const auth = admin.auth();
  export const db = admin.firestore();
  export default adminApp;
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
