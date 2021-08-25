import firebase from 'firebase/app'


export const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_KEY,
    authDomain: "desktop-vue-fruit-finder-ca2d4.firebaseapp.com",
    databaseURL: "https://desktop-vue-fruit-finder-ca2d4.firebaseio.com",
    projectId: "desktop-vue-fruit-finder-ca2d4",
    storageBucket: "desktop-vue-fruit-finder-ca2d4.appspot.com",
    messagingSenderId: "225501907734",
    appId: "1:225501907734:web:fbdda5452334541239de37",
    measurementId: "G-6DBDRELPKM"
       };

const FirebaseApp = firebase.initializeApp(firebaseConfig)



// console.log("Firebase init with config", FirebaseApp.options);

export default {
  FirebaseApp: FirebaseApp
}
