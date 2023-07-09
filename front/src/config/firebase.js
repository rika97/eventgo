import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBrEKPI0pjN33ckW--zwYubqjHygfGEB2M",
    authDomain: "tactile-acrobat-392115.firebaseapp.com",
    projectId: "tactile-acrobat-392115",
    storageBucket: "tactile-acrobat-392115.appspot.com",
    messagingSenderId: "273536650521",
    appId: "1:273536650521:web:c1ea4247af8dfceca60988",
    measurementId: "G-6BMMY5GPJ3"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const storage = getStorage(app);
export default storage;