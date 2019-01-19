import * as firebase from 'firebase';

// Initialize Firebase
var firebaseConfig = {
  apiKey: 'AIzaSyC_rvMHm3bP2ta4fXKy1UyRJO36tDKPUdk',
  authDomain: 'vcafe-d5b89.firebaseapp.com',
  databaseURL: 'https://vcafe-d5b89.firebaseio.com',
  storageBucket: 'vcafe-d5b89.appspot.com',
  projectId: 'vcafe-d5b89',
  messagingSenderId: ''
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
