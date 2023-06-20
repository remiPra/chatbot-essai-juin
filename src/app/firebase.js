// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYiabl62nJ52KPdBs422ID4C8DmGhZYXs",
  authDomain: "chatbot-seb.firebaseapp.com",
  projectId: "chatbot-seb",
  storageBucket: "chatbot-seb.appspot.com",
  messagingSenderId: "481810335002",
  appId: "1:481810335002:web:bdd2e8af370b5bb4ac98a3",
  measurementId: "G-WK8RT1MQ5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db