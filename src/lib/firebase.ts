import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA80r0YY_iSP90J1jZbb0PQmFBw7Mosmd8',
  authDomain: 'chek-app.firebaseapp.com',
  projectId: 'chek-app',
  storageBucket: 'chek-app.appspot.com',
  messagingSenderId: '311708150226',
  appId: '1:311708150226:web:851f9abec23687577c000b',
  measurementId: 'G-0QVFKT2VGG'
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
