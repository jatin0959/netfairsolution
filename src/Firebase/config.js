import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAqtuLFQW0rCfXjWNLwPF0jcpcRaDH6jHw",
    authDomain: "paymentprovider-51e4a.firebaseapp.com",
    projectId: "paymentprovider-51e4a",
    storageBucket: "paymentprovider-51e4a.appspot.com",
    messagingSenderId: "233479816438",
    appId: "1:233479816438:web:d67e5999059087950818d7"
  };

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }



