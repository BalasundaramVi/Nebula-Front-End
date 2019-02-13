import Firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBH0BkBm0vu8pcYdYXWanImakgC9FfOxjg',
  authDomain: 'nebula-front-end.firebaseapp.com',
  databaseURL: 'https://nebula-front-end.firebaseio.com',
  projectId: 'nebula-front-end',
  storageBucket: 'nebula-front-end.appspot.com',
  messagingSenderId: '942691775781',
};

const firebaseApp = Firebase.initializeApp(config);
const db = firebaseApp.database();
const dbQuestionsRef = db.ref('questions');
const dbUsersRef = db.ref('users');

export { dbQuestionsRef, dbUsersRef };
