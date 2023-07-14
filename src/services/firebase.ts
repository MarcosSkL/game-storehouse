import { initializeApp, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";


let app

try {
    app = getApp()
} catch (error) {
    const firebaseConfig = {
        apiKey: process.env.APIKEY,
        authDomain: process.env.AUTHDOMAIN,
        projectId: process.env.PROJECTID,
        storageBucket: process.env.STORAGEBUCKET,
        messagingSenderId: process.env.MESSAGINGSENDERID,
        appId: process.env.APPID
    };

    app = initializeApp(firebaseConfig);
}

const db = getDatabase(app)

export { db }