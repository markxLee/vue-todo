import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcwEz_gdNs_LSByYoLbS4rfhN6SDXvBMo",
  authDomain: "todo-react-6472c.firebaseapp.com",
  projectId: "todo-react-6472c",
  storageBucket: "todo-react-6472c.appspot.com",
  messagingSenderId: "16744649081",
  appId: "1:16744649081:web:25b6fb73ac1635381c1fa8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();

export default firestore;
