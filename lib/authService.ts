import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  AuthError,
  User,
  applyActionCode,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

  // Verify auth is initialized
  if (!auth) {
    throw new Error("Firebase Auth not initialized");
  }

  export const signupWithEmail = async (
    email: string,
    password: string,
    displayName?: string
  ): Promise<User> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile must happen after successful creation
      if (displayName) {
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
      }
      
      // Send verification email
      await sendEmailVerification(userCredential.user);
      
      // Force token refresh
      await userCredential.user.getIdToken(true);
      
      return userCredential.user;
    } catch (error) {
      console.error('Signup error details:', error); // Detailed error logging
      const firebaseError = error as AuthError;
      throw new Error(getAuthErrorMessage(firebaseError.code));
    }
  };
  
// Add these functions to your existing authService.ts
export const resendVerificationEmail = async (email: string) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
    } else {
      throw new Error('No user found. Please sign in first.');
    }
  } catch (error) {
    const firebaseError = error as AuthError;
    throw new Error(getAuthErrorMessage(firebaseError.code));
  }
};

export const verifyEmailOTP = async (oobCode: string) => {
  try {
    await applyActionCode(auth, oobCode);
    await auth.currentUser?.reload();
  } catch (error) {
    const firebaseError = error as AuthError;
    throw new Error(getAuthErrorMessage(firebaseError.code));
  }
};

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    if (!userCredential.user.emailVerified) {
      throw new Error("Please verify your email before logging in. Check your inbox for the verification link.");
    }
    
    return userCredential.user;
  } catch (error) {
    const firebaseError = error as AuthError;
    console.error('Login Error:', firebaseError);
    throw new Error(getAuthErrorMessage(firebaseError.code));
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    const firebaseError = error as AuthError;
    console.error('Password Reset Error:', firebaseError);
    throw new Error(getAuthErrorMessage(firebaseError.code));
  }
};

// Helper function to convert Firebase error codes to user-friendly messages
const getAuthErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};