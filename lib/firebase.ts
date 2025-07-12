// lib/firebase.ts

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:`${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain:`${process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN}`,
  projectId:`${process.env.NEXT_PUBLIC_FIREBASE_PROJECTID}`,
  storageBucket:`${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId:`${process.env.NEXT_PUBLIC_FIREBASE_MESSAGEING_SENDERID}`,
  appId:`${process.env.NEXT_PUBLIC_FIREBASE_APPID}`,
  measurementId:`${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);