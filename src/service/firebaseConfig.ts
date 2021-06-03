import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDuCnKofuIgYF0T1zQOAafIl-JW7ztP2ME",
    authDomain: "itms-7304e.firebaseapp.com",
    databaseURL: "https://itms-7304e-default-rtdb.firebaseio.com/",
    projectId: "itms-7304e",
    storageBucket: "itms-7304e.appspot.com",
    messagingSenderId: "987289586833",
    appId: "1:987289586833:web:fe47c8346ef874bda9c330",
    measurementId: "G-4LTPSCERKC"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

export { firebase, firestore };