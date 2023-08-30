
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
   apiKey: "AIzaSyCDhiWH4gwD92KS7GIzR9EZ-OFJYaZ0WZ8",
  authDomain: "usquareproject.firebaseapp.com",
  projectId: "usquareproject",
  storageBucket: "usquareproject.appspot.com",
  messagingSenderId: "725696446880",
  appId: "1:725696446880:web:2151961cb65d0edc6de4c5",
  measurementId: "G-BQ8NHDKP2D"
  
  };
  
  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const analytics = getAnalytics(app);