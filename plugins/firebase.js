import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAJG6q5iR7mYC2tPrSNfa9sjcL1gqwgwjE',
    authDomain: 'test-project-c6572.firebaseapp.com',
    projectId: 'test-project-c6572',
    storageBucket: 'test-project-c6572.appspot.com',
    messagingSenderId: '171124635220',
    appId: '1:171124635220:web:e05145e99859e8657d5fc1',
    measurementId: 'G-X4TLKYVXPK',
  })
  firebase.analytics()
}

export default firebase
