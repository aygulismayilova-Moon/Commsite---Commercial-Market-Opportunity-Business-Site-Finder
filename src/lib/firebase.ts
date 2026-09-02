import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey,
  authDomain: firebaseConfigData.authDomain,
  projectId: firebaseConfigData.projectId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
  appId: firebaseConfigData.appId,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = firebaseConfigData.firestoreDatabaseId
  ? getFirestore(app, firebaseConfigData.firestoreDatabaseId)
  : getFirestore(app);

export const auth = getAuth(app);

// Connection verification test per Firebase skill
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    const errorMsg = error instanceof Error ? error.message : String(error || '');
    if (
      errorMsg.includes('the client is offline') ||
      errorMsg.includes('unavailable') ||
      errorMsg.includes('Could not reach Cloud Firestore') ||
      error?.code === 'unavailable'
    ) {
      console.warn('[Firebase] Client is operating in offline/cached mode until backend is reached.');
    } else {
      console.warn('[Firebase] Connection status note:', errorMsg);
    }
  }
}

if (typeof window !== 'undefined') {
  // Test connection non-blockingly
  setTimeout(() => {
    testConnection().catch(() => {});
  }, 1000);
}

