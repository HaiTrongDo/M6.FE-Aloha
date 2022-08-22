// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBfK-V8-uhoaZqQv1neGkwvtALV-toesXA",
    authDomain: "aloha-money.firebaseapp.com",
    projectId: "aloha-money",
    storageBucket: "aloha-money.appspot.com",
    messagingSenderId: "509062754311",
    appId: "1:509062754311:web:885934818f6c32759bfaa2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;