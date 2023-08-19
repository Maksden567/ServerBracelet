import  { initializeApp } from "firebase/app";
import  { getStorage } from "firebase/storage";
import 'dotenv/config'

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.API_ID,
    measurementId: process.env.MEASURMENT_ID
  };
  const firebaseApp = initializeApp(firebaseConfig);

  export const storage= getStorage(firebaseApp);