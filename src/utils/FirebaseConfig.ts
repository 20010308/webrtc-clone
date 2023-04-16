// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {collection, getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5GAU5i46w7bEeVkbPYxRezbxE9Bp7cbE",
    authDomain: "zoom-clone-fc9b0.firebaseapp.com",
    projectId: "zoom-clone-fc9b0",
    storageBucket: "zoom-clone-fc9b0.appspot.com",
    messagingSenderId: "169666376232",
    appId: "1:169666376232:web:4fe18b1a1e52b2b1647b1d",
    measurementId: "G-8GXGKCV1CB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB, "users");
export const meetingRef = collection(firebaseDB, "meetings");