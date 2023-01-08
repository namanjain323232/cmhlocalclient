import firebase from "firebase/app";
import "firebase/auth";
import keys from "./config/keys";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: keys.FIREBASE_API_KEY,
  authDomain: keys.AUTH_DOMAIN,
  projectId: keys.PROJECT_ID,
  storageBucket: keys.STORAGE_BUCKET,
  messagingSenderId: keys.MESSAGING_SENDER_ID,
  appId: keys.FIREBASE_APP_ID,
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//export auth provider

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
