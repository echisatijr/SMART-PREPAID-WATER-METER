import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCXkVM3-W_BwztwNDrtU-05PGyac8pQEQA',
  authDomain: 'meter-123.firebaseapp.com',
  databaseURL: 'https://meter-123-default-rtdb.firebaseio.com',
  projectId: 'meter-123',
  storageBucket: 'meter-123.appspot.com',
  messagingSenderId: '71607014013',
  appId: '1:71607014013:web:ad4c775af3dbacc95b9714',
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
