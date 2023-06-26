import { initializeApp, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";


let app

try {
    app = getApp()
} catch (error) {
    const firebaseConfig = {
        apiKey: "AIzaSyAXJk4-yBkpvWNd8ebJrn6q9zqWZKkeUwA",
        authDomain: "gamestore-bccb3.firebaseapp.com",
        projectId: "gamestore-bccb3",
        storageBucket: "gamestore-bccb3.appspot.com",
        messagingSenderId: "225935679663",
        appId: "1:225935679663:web:b71040e0d006b99fa1345a"
    };

    app = initializeApp(firebaseConfig);
}

const db = getDatabase(app)

export { db }