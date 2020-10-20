import firebase from 'firebase'

export const firebaseConfig = {
         apiKey: process.env.VUE_APP_FIREBASE_KEY,
         authDomain: "desktop-fruit-finder.firebaseapp.com",
         databaseURL: "https://desktop-fruit-finder.firebaseio.com",
         projectId: "desktop-fruit-finder",
         storageBucket: "desktop-fruit-finder.appspot.com",
         messagingSenderId: "100321669862",
         appId: "1:100321669862:web:dd9d655abb9efc0735c127",
         measurementId: "G-X3KBWZ4ZKV",
       };

const FirebaseApp = firebase.initializeApp(firebaseConfig)

console.log("Firebase init with config", FirebaseApp.options);

export default {
  FirebaseApp: FirebaseApp
}

