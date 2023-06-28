import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: 'AIzaSyAy7FfoT63hlEQYbRWQ0IlX3HKhj1LjWOs',
    authDomain: "apptodolist-2e29c.firebaseapp.com",
    projectId: "apptodolist-2e29c",
    storageBucket: "apptodolist-2e29c.appspot.com",
    messagingSenderId: "1035315299275",
    appId: "1:1035315299275:web:6c9ff71e43fabdf2086c4e",
    measurementId: "G-CVCYD5D8W4"

};



const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth }