// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL6qD1-wweTpZ8G3cBLsZJlXxiMw7bviU",
  authDomain: "northeast-voyage.firebaseapp.com",
  projectId: "northeast-voyage",
  storageBucket: "northeast-voyage.appspot.com",
  messagingSenderId: "382160644443",
  appId: "1:382160644443:web:bf337ec6abc34e8b27927e",
  measurementId: "G-6PHM28R7TT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
