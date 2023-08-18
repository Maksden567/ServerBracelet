import  { initializeApp } from "firebase/app";
import  { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCpmAiUIpzMYepZiKqs71opwXRQpAOfeZg",
    authDomain: "server-462bc.firebaseapp.com",
    projectId: "server-462bc",
    storageBucket: "server-462bc.appspot.com",
    messagingSenderId: "14257139044",
    appId: "1:14257139044:web:6aede9be6197f0d88fde71",
    measurementId: "G-RGWDD8Z102"
  };
  const firebaseApp = initializeApp(firebaseConfig);

  export const storage= getStorage(firebaseApp);