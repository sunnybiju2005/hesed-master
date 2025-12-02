// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBH1nXrlF1zngeHqQSW8CCygxUTVvJSE8",
    authDomain: "stpaulschurch-ea5cf.firebaseapp.com",
    projectId: "stpaulschurch-ea5cf",
    storageBucket: "stpaulschurch-ea5cf.firebasestorage.app",
    messagingSenderId: "71804734692",
    appId: "1:71804734692:web:b0a870d9b3e1010e6b30f1",
    measurementId: "G-5GLK3SKM7V",
    databaseURL: "https://stpaulschurch-ea5cf-default-rtdb.firebaseio.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Realtime Database (not Firestore)
const db = firebase.database();
// Note: Storage is now handled by Cloudinary, not Firebase Storage

