import firebase from 'firebase';
import 'firebase/firebase-firestore';

const firebaseConfig = {

  apiKey: "AIzaSyA8QV4zlqA-JW0pT5prt_0KLAKf4jqNOLQ",

  authDomain: "collegediplom.firebaseapp.com",

  databaseURL: "https://collegediplom-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "collegediplom",

  storageBucket: "collegediplom.appspot.com",

  messagingSenderId: "491558284841",

  appId: "1:491558284841:web:e0ae836edb914f10b8f638",

  measurementId: "G-48TPFQ0MK5"

};

const app = firebase.initializeApp(firebaseConfig);

export default app;