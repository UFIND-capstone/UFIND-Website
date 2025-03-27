// firebase.js
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();


// Load the service account from an environment variable
const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccountJson) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set');
}

// Parse the service account JSON
const serviceAccount = JSON.parse(serviceAccountJson);

// Validate required fields
const requiredFields = [
  'type',
  'project_id',
  'private_key_id',
  'private_key',
  'client_email',
  'client_id',
  'auth_uri',
  'token_uri',
  'auth_provider_x509_cert_url',
  'client_x509_cert_url',
  'universe_domain'
];

for (const field of requiredFields) {
  if (!serviceAccount[field]) {
    throw new Error(`Service account is missing required field: ${field}`);
  }
}

// Ensure the private key has proper newlines (in case the environment variable escaped them)
if (serviceAccount.private_key) {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
}

// Initialize Firebase Admin SDK
const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
  
  export const auth = admin.auth();
  export const db = admin.firestore();
  export default adminApp;
