import firebase from 'firebase';
// import Rebase from 're-base';

const firebaseConfig = {
    apiKey: "AIzaSyA2f7XpUmgt4SXBpFQLSfvRbSBPnFKJdD8",
    authDomain: "social-media-813da.firebaseapp.com",
    databaseURL: "https://social-media-813da.firebaseio.com",
    projectId: "social-media-813da",
    storageBucket: "social-media-813da.appspot.com",
    messagingSenderId: "626498895110",
    appId: "1:626498895110:web:a33e97ed7c1d08d8f17287",
    measurementId: "G-RZJ6C0H38Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const base = Rebase.createClass(fire.database())


export default firebase;