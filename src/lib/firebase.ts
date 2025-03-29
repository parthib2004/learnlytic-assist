import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCq8zD9NqeSZvOhFJ-uy-zdObkFGSC7wFQ",
  authDomain: "learnlytic-assist.firebaseapp.com",
  projectId: "learnlytic-assist",
  storageBucket: "learnlytic-assist.firebasestorage.app",
  messagingSenderId: "941997304315",
  appId: "1:941997304315:web:f057dce8e504026e6c835e",
  measurementId: "G-VXLCMPMZSC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 