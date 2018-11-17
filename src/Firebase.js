import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAqKGS5otURC29I5Kf-TmYXbCnhSw-W6Mw",
    authDomain: "applab-quizshow.firebaseapp.com",
    databaseURL: "https://applab-quizshow.firebaseio.com",
    projectId: "applab-quizshow",
    storageBucket: "applab-quizshow.appspot.com",
    messagingSenderId: "498229422655"
};

firebase.initializeApp(config);

export default firebase;
