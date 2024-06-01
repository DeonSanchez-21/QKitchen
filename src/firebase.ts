import { getAuth,  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


export const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyBVAkg8eS5_N6G3SEObBgh4Tzt1bM2CD-g",
  authDomain: "q-kitchen.firebaseapp.com",
  projectId: "q-kitchen",
  storageBucket: "q-kitchen.appspot.com",
  messagingSenderId: "409465077238",
  appId: "1:409465077238:web:7f7e793b288078a5045bd7",
  measurementId: "G-WPTBVNGFF9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
