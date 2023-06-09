import * as firebase from 'firebase';
import {constants} from 'assets';

// Initialize Firebase
const config = {
  apiKey: constants.firebase.FIREBASE_API_KEY,
  authDomain: constants.firebase.FIREBASE_AUTH_DOMAIN,
  databaseURL: constants.firebase.FIREBASE_DATABASE_URL,
  projectId: constants.firebase.FIREBASE_PROJECT_ID,
  storageBucket: constants.firebase.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: constants.firebase.FIREBASE_MESSAGING_SENDER_ID,
  persistence: true,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
