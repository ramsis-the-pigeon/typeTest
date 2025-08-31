import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import { Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDGWsgeuRzOe4m9CqW5k5i3lLKmM6ksze8",
  authDomain: "typetest-app.firebaseapp.com",
  projectId: "typetest-app",
  storageBucket: "typetest-app.firebasestorage.app",
  messagingSenderId: "868644911334",
  appId: "1:868644911334:web:001d49723d7d8c677d2327",
  measurementId: "G-VDJZ7S2CJD"
};

const app = initializeApp(firebaseConfig);
const auth = firebase.auth()
const db = Firestore.Firestore()

export {auth, db}