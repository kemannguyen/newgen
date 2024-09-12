// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "newgen-1309c.firebaseapp.com",
  projectId: "newgen-1309c",
  storageBucket: "newgen-1309c.appspot.com",
  messagingSenderId: "505224639876",
  appId: "1:505224639876:web:26a40bd3db1fc2f25619d1",
  measurementId: "G-M7RJ62ZGY2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
