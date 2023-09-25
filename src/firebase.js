// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAdzLzS2F7mXbGBFNC4noFs0dxUyycn-1Y",
    authDomain: "article-management-syste-913d0.firebaseapp.com",
    projectId: "article-management-syste-913d0",
    storageBucket: "article-management-syste-913d0.appspot.com",
    messagingSenderId: "825347098137",
    appId: "1:825347098137:web:78187a5473e7b808e80c88"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
