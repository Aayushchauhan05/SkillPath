"use client"
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyAvEfueus6jQtTPeu6TucGuw4CMUCOljC0",
    authDomain: "mentor-mentee-app-64acd.firebaseapp.com",
    databaseURL: "https://mentor-mentee-app-64acd-default-rtdb.firebaseio.com",
    projectId: "mentor-mentee-app-64acd",
    storageBucket: "mentor-mentee-app-64acd.appspot.com",
    messagingSenderId: "949385816951",
    appId: "1:949385816951:web:2db4225e97b8496e39cf72",
    measurementId: "G-5BFF460WTR",
    databaseURL:"https://mentor-mentee-app-64acd-default-rtdb.firebaseio.com"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

// Create Firebase Context
const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
    // Signup function
    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    };

    const signinUserWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    };

    return (
        <FirebaseContext.Provider value={{ firebaseApp,firebaseAuth,database,signupUserWithEmailAndPassword,signinUserWithEmailAndPassword  }}>
            {children}
        </FirebaseContext.Provider>
    );
};

export { firebaseApp, firebaseAuth, database };
