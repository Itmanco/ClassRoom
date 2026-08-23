// src/firebase-init.js

import {
  initializeApp,
} from "firebase/app";

import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

import {
  connectFirestoreEmulator,
  getFirestore,
} from "firebase/firestore";

import {
  connectFunctionsEmulator,
  getFunctions,
} from "firebase/functions";

// Conditionally use global Canvas variables
// or .env variables.
const firebaseConfig =
  typeof __firebase_config !== "undefined"
    ? JSON.parse(
        __firebase_config,
      )
    : {
        apiKey:
          process.env
            .VUE_APP_FIREBASE_API_KEY,

        authDomain:
          process.env
            .VUE_APP_FIREBASE_AUTH_DOMAIN,

        projectId:
          process.env
            .VUE_APP_FIREBASE_PROJECT_ID,

        storageBucket:
          process.env
            .VUE_APP_FIREBASE_STORAGE_BUCKET,

        messagingSenderId:
          process.env
            .VUE_APP_FIREBASE_MESSAGING_SENDER_ID,

        appId:
          process.env
            .VUE_APP_FIREBASE_APP_ID,
      };

// __app_id is primarily for Firestore
// pathing in Canvas.
const appId =
  typeof __app_id !== "undefined"
    ? __app_id
    : process.env
        .VUE_APP_FIREBASE_PROJECT_ID ||
      "default-local-app-id";

const app =
  initializeApp(
    firebaseConfig,
  );

const auth =
  getAuth(app);

const db =
  getFirestore(app);

const functions =
  getFunctions(
    app,
  );

// ----------------------------------------
// Local Functions Emulator
// ----------------------------------------

if (
  process.env.NODE_ENV ===
  "development"
) {
  connectAuthEmulator(
    auth,
    "http://127.0.0.1:9099",
    {
      disableWarnings: true,
    },
  );

  connectFirestoreEmulator(
    db,
    "127.0.0.1",
    8080,
  );

  connectFunctionsEmulator(
    functions,
    "127.0.0.1",
    5001,
  );
}

const authReadyPromise =
  new Promise(
    (resolve) => {
      onAuthStateChanged(
        auth,
        (user) => {
          resolve(
            user || null,
          );
        },
      );
    },
  );

export {
  appId,
  auth,
  authReadyPromise,
  db,
  functions,
};