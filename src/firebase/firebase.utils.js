import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCliWCpuuKZsNF3WEGb6PW9VwwFbdu66_M",
    authDomain: "crwn-db-d67fc.firebaseapp.com",
    databaseURL: "https://crwn-db-d67fc.firebaseio.com",
    projectId: "crwn-db-d67fc",
    storageBucket: "crwn-db-d67fc.appspot.com",
    messagingSenderId: "895922571081",
    appId: "1:895922571081:web:5e3d70b79a1193f3153c98",
    measurementId: "G-66VG7SQMLF"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;