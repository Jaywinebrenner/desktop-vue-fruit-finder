import firebase from 'firebase';

const db = firebase.firestore({
  timestampsInSnapshots: true,
});

export default db;
