import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: 'AIzaSyD74CRTsdHhEfTa1nju1xQ2N3VH41bi9AI',
  authDomain: 'swps-3c63d.firebaseapp.com',
  databaseURL: 'https://swps-3c63d-default-rtdb.firebaseio.com',
  projectId: 'swps-3c63d',
  storageBucket: 'swps-3c63d.appspot.com',
  messagingSenderId: '880271184821',
  appId: '1:880271184821:web:7052900ec0c19182133ffc',
}
if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}

export default firebase
