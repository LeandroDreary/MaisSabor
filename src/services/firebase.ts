import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID
  });
  
export let db = firebase.firestore();