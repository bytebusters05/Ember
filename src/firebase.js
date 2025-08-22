// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPxhFESy2L2Ih781YbkxjkMA_L6BwrrhM",
  authDomain: "ember-ec39a.firebaseapp.com",
  projectId: "ember-ec39a",
  storageBucket: "ember-ec39a.firebasestorage.app",
  messagingSenderId: "66896043700",
  appId: "1:66896043700:web:8027fb2b1a1a05d35b81e1",
  measurementId: "G-3HVLLWYF1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);