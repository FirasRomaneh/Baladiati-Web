import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyCm2U2TLoExS6Ts3n-nMkcqD17nQ5Fav6I",
  // authDomain: "test-faa9f.firebaseapp.com",
  // databaseURL: "https://test-faa9f-default-rtdb.firebaseio.com",
  // projectId: "test-faa9f",
  // storageBucket: "test-faa9f.appspot.com",
  // messagingSenderId: "407522252413",
  // appId: "1:407522252413:web:f07013d3c0355a7d254314",
  // measurementId: "G-DG43B9NGMM"
  apiKey: "AIzaSyAWxSXebnc3v-0JyD-1ZSeeZc500jq9BsM",
  authDomain: "baladiati-91e52.firebaseapp.com",
  databaseURL: "https://baladiati-91e52-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "baladiati-91e52",
  storageBucket: "baladiati-91e52.appspot.com",
  messagingSenderId: "823880200306",
  appId: "1:823880200306:web:6e0ff06f1c1ee6fb8cd2eb",
  measurementId: "G-XV3G15FHKW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
  
export default db;