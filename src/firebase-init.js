// src/firebase-init.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Conditionally use global Canvas variables or .env variables
const firebaseConfig = typeof __firebase_config !== 'undefined'
  ? JSON.parse(__firebase_config)
  : {
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_FIREBASE_APP_ID // This is for client-side use
    };

const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// __app_id is primarily for Firestore pathing in Canvas. For local dev,
// you might derive it from projectId or use a hardcoded value if needed.
const appId = typeof __app_id !== 'undefined' ? __app_id : process.env.VUE_APP_FIREBASE_PROJECT_ID || 'default-local-app-id';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let authReadyPromise = new Promise(resolve => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("Firebase authenticated. User ID:", user.uid);
      resolve(user.uid);
    } else {
      try {
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }
        console.log("Firebase auth attempt complete.");
        resolve(auth.currentUser ? auth.currentUser.uid : null);
      } catch (error) {
        console.error("Firebase authentication failed:", error);
        resolve(null);
      }
    }
  });
});

export { db, auth, authReadyPromise, appId };
