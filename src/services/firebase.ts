import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: 'gs://barbina-73ea6.appspot.com'
});
  
const auth = firebase.auth();

const db = firebase.firestore();

const storage = firebase.storage();

export { firebase, auth, db, storage }