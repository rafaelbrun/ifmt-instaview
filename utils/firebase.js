import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'


const config = {
  apiKey: "AIzaSyD7keAmVfh4b8ZHDGh25UTbWInStVXYABo",
  authDomain: "instaview-636bb.firebaseapp.com",
  projectId: "instaview-636bb",
  storageBucket: "instaview-636bb.appspot.com",
  messagingSenderId: "47927575579",
  appId: "1:47927575579:web:c3bd4c6e471c9084d5a4be"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
  
const firestore = firebase.firestore();

export { firestore };