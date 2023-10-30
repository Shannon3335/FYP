// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_ATU_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

// const firebaseConfig = {
//     apiKey: "AIzaSyDVaLRPMuhrJiZFYXhMTZMneRc3ouLnY7Y",
//     authDomain: "shannon-fyp.firebaseapp.com",
//     projectId: "shannon-fyp",
//     storageBucket: "shannon-fyp.appspot.com",
//     messagingSenderId: "911819503153",
//     appId: "1:911819503153:web:ed8987280eb5039b24c710",
//     measurementId: "G-ZMDN2JVXKT"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
