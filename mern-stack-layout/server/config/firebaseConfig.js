import admin from 'firebase-admin';
import { getStorage } from 'firebase-admin/storage';
// import { firebaseServiceAccount, storageBucket } from './config.js';
import { config } from 'dotenv';

config();

const storageBucket = process.env.FIREBASE_BUCKET_NAME;

// const firebaseServiceAccount = JSON.parse(process.env.FIREBASE_URI);
const firebaseServiceAccount = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key.replace(/\\n/g, '\n'),
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
  universe_domain: process.env.universe_domain,
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount),
  storageBucket,
});

const bucket = getStorage().bucket();
export { bucket };
