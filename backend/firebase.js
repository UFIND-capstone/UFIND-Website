// firebase.js
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();


const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, '\n');  // Ensure newlines are properly formatted
const privateKeyId = process.env.PRIVATE_KEY_ID;
const clientEmail = process.env.CLIENT_EMAIL;
const clientId = process.env.CLIENT_ID;
const clientCertUrl = process.env.CLIENT_CERT_URL

const privateKey2 = process.env.PRIVATE_KEY2?.replace(/\\n/g, '\n');  // Ensure newlines are properly formatted
const privateKeyId2 = process.env.PRIVATE_KEY_ID2;
const clientEmail2 = process.env.CLIENT_EMAIL2;
const clientId2 = process.env.CLIENT_ID2;
const clientCertUrl2 = process.env.CLIENT_CERT_URL2

// Initialize Firebase Admin with your service account
const serviceAccount = {
    "type": "service_account",
    "project_id": "ufind-cb187",
    "private_key_id": privateKeyId2,
    "private_key": privateKey2,
    "client_email": clientEmail2,
    "client_id": clientId2,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": clientCertUrl2,
    "universe_domain": "googleapis.com"
  }
  

  const adminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  export const auth = admin.auth();
  export const db = admin.firestore();
  export default adminApp;
