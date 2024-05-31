import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { setDoc, getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiB2D9g92pbGug29utNmKovtrzDU6rgCA",
  authDomain: "netflixclone-53b7c.firebaseapp.com",
  projectId: "netflixclone-53b7c",
  storageBucket: "netflixclone-53b7c.appspot.com",
  messagingSenderId: "579593078573",
  appId: "1:579593078573:web:14748f6cbc9f5adfdbf5a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        console.log("User created with ID: ", user.uid);
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        });
        console.log("User document created in Firestore");
        toast.success(`Bienvenido ${name}`);
    } catch (error) {
        console.log("Error during signup: ", error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
};

const getUsername = async (uid) => {
    try {
        console.log("UID del usuario: ", uid);
        const userDoc = await getDoc(doc(db, 'users', uid));
        console.log("Document data: ", userDoc.data());
        if (userDoc.exists()) {
            console.log("User document data: ", userDoc.data());
            return userDoc.data().name;
        } else {
            console.log('No se encontró el documento del usuario');
            return null;
        }
    } catch (error) {
        console.log('Error al obtener el documento: ', error);
        return null;
    }
};

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user);
            } else {
                reject('No hay ningún usuario autenticado');
            }
        });
    });
};

export { auth, db, signup, login, logOut, getUsername, getCurrentUser };
