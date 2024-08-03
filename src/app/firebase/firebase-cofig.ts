// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1M4lS1YefB6UVyV5bRkS7liJIYrxL3z0",
  authDomain: "northeast-voyage-1ff5c.firebaseapp.com",
  projectId: "northeast-voyage-1ff5c",
  storageBucket: "northeast-voyage-1ff5c.appspot.com",
  messagingSenderId: "533242597428",
  appId: "1:533242597428:web:5406f4536b268e0d01ba61",
  measurementId: "G-YMDYL1ZK36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
