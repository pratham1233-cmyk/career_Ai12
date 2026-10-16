import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, { ignoreUndefinedProperties: true });

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline',
  include_granted_scopes: 'true',
});

provider.addScope('https://www.googleapis.com/auth/drive.file');
provider.addScope('https://www.googleapis.com/auth/spreadsheets');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        onAuthSuccess?.(user, cachedAccessToken);
      } else if (!isSigningIn) {
        onAuthSuccess?.(user, '');
      }
    } else {
      cachedAccessToken = null;
      onAuthFailure?.();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken ?? null;

      if (!accessToken) {
        throw new Error('Failed to get access token from Google sign in');
      }

      cachedAccessToken = accessToken;
      return { user: result.user, accessToken };
    } catch (popupError: any) {
      const isPopupBlocked = popupError?.code === 'auth/popup-blocked' || popupError?.message?.toLowerCase().includes('popup');
      if (isPopupBlocked) {
        await signInWithRedirect(auth, provider);
        const redirectResult = await getRedirectResult(auth);

        if (!redirectResult) {
          throw new Error('Redirect sign-in did not return a Google user result');
        }

        const redirectCredential = GoogleAuthProvider.credentialFromResult(redirectResult);
        const redirectToken = redirectCredential?.accessToken ?? null;

        if (!redirectToken) {
          throw new Error('Redirect sign-in completed without a Google access token');
        }

        cachedAccessToken = redirectToken;
        return { user: redirectResult.user as User, accessToken: redirectToken };
      }

      throw popupError;
    }
  } catch (error: any) {
    console.error('Google Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};
