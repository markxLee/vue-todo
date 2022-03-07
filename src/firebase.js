import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBGEmmYMYJoNJLPW2ttzA8w6UerTId6FUs",
    authDomain: "vue-todo-app-26986.firebaseapp.com",
    projectId: "vue-todo-app-26986",
    storageBucket: "vue-todo-app-26986.appspot.com",
    messagingSenderId: "9096330193",
    appId: "1:9096330193:web:daa44f7fd128b587f93ef0"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const firestore = firebaseApp.firestore();

  export default firestore;