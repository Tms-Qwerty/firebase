import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSv0qCB7Y61Crod8l-T54HZIYvlpnFcSo",
  authDomain: "proyecto-final-bootcamp-18e38.firebaseapp.com",
  databaseURL:
    "https://proyecto-final-bootcamp-18e38-default-rtdb.firebaseio.com/",
  projectId: "proyecto-final-bootcamp-18e38",
  storageBucket: "proyecto-final-bootcamp-18e38.appspot.com",
  messagingSenderId: "465882818232",
  appId: "1:465882818232:web:256dae5105ee1a4f13f64d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
