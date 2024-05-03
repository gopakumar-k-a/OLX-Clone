import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDDJvrnW-N8aKF7a_JHoY_XkunVKCq8djU",
    authDomain: "olx-project-c1d7d.firebaseapp.com",
    projectId: "olx-project-c1d7d",
    storageBucket: "olx-project-c1d7d.appspot.com",
    messagingSenderId: "816927321238",
    appId: "1:816927321238:web:b69eb626be97027a8666b7",
    measurementId: "G-4410KC6YML"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export default getFirestore(app);