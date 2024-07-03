import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'r-n-74635.firebaseapp.com',
  projectId: 'r-n-74635',
  storageBucket: 'r-n-74635.appspot.com',
  messagingSenderId: '1016725012176',
  appId: '1:1016725012176:web:1d80ed35e82b25710268d5'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
