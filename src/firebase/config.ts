// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmKvnNt3N3wAW4Qe8-5si_fPuu8T2iG_c",
  authDomain: "coprac-fa7ae.firebaseapp.com",
  projectId: "coprac-fa7ae",
  storageBucket: "coprac-fa7ae.appspot.com",
  messagingSenderId: "1004693149640",
  appId: "1:1004693149640:web:0790b4f999b19b407d92fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export const firebase = {
    app,
    auth,
}