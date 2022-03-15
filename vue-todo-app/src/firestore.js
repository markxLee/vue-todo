import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhj3KNZqa-5jLpHEy4CXKL7hhx0JAaiAE",
  authDomain: "yc-todo-list.firebaseapp.com",
  projectId: "yc-todo-list",
  storageBucket: "yc-todo-list.appspot.com",
  messagingSenderId: "898017936910",
  appId: "1:898017936910:web:f6ad72d792183c5a73de5f",
  measurementId: "G-BCDCTNDDCH"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

db.settings({ timestampsInSnapshots: true })

export default db;



