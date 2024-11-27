// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA8RCwSvz3tR3JRU5Jq5XLChzROK2n68HE',
	authDomain: 'skillcyprus.firebaseapp.com',
	projectId: 'skillcyprus',
	storageBucket: 'skillcyprus.firebasestorage.app',
	messagingSenderId: '719888636480',
	appId: '1:719888636480:web:2187c917e1b64109961da5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, app, auth };
