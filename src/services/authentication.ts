import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
    signInWithEmailAndPassword,
    getAuth,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore,
    query,
    getDocs,
    where
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID
};

let app;
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

const db2 = getFirestore(app);
const db = getDatabase(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider()

const loginComEmailESenha = async (email: any, senha: any) => {
    try {
        await signInWithEmailAndPassword(auth, email, senha);
    } catch (error) {

    }
}

const registrarComEmailESennha = async (name: any, email: any, pwd: any) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, pwd);
        const user = res.user;
        await addDoc(collection(db2, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })

    } catch (error) {
        //
    }
}

const recuperarSenha = async (email: any) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Email para recuperação de senha enviado");
    } catch (error) {
        //
    }
}

const logout = () => {
    signOut(auth);
}

const entrarComGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db2, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);

        if (docs.docs.length === 0) {
            await addDoc(collection(db2, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            })
        }
    } catch (error) {
        //
    }
}

export {
    db,
    auth,
    db2,
    loginComEmailESenha,
    registrarComEmailESennha,
    recuperarSenha,
    logout,
    entrarComGoogle
};