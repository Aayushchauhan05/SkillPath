'use client'
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    signInWithPopup,
    updatePassword,
    RecaptchaVerifier,
  } from "firebase/auth";
  import { auth } from "./firebase";
  
  export const createUserFireBase = async (data) => {
    try {
      const { email, password } = data;
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };
  
  export const SignInWithFirebaseWithEmailAndPassword = async (data) => {
    try {
      const { email, password } = data;
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };
  
  export const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };
  
  export const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };
  
  export const passwordChange = async (newPassword) => {
    try {
      if (auth.currentUser) {
        return await updatePassword(auth.currentUser, newPassword);
      } else {
        throw new Error("No user is currently signed in");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  };
  
  export const sendEmailVerification = async () => {
    try {
      if (auth.currentUser) {
        return await sendEmailVerification(auth.currentUser, {
          // url: `${window.location.origin}/home`,
        });
      } else {
        throw new Error("No user is currently signed in");
      }
    } catch (error) {
      console.error("Error sending email verification:", error);
      throw error;
    }
  };
  
  export const sendPasswordReset = async (email) => {
    try {
      return await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  };
  
  export const SendVerificationMobile = async (phone, recaptchaVerifier) => {
    try {
      return await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
    } catch (error) {
      console.error("Error sending verification code to phone:", error);
      throw error;
    }
  };
  
  export const setUpRecaptcha = (containerId) => {
    return new RecaptchaVerifier(containerId, {
      size: "normal",
      callback: (response) => {
        console.log("reCAPTCHA verified!");
      },
    }, auth);
  };
  