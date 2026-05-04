import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBifupL7Thi6m5xX7zMTuX5Kx4tk_crQnE",
  authDomain: "smartcare-fae8b.firebaseapp.com",
  projectId: "smartcare-fae8b",
  storageBucket: "smartcare-fae8b.firebasestorage.app",
  messagingSenderId: "519533030887",
  appId: "1:519533030887:web:10ef77b84b8162af0e2142",
};

// ✅ Prevent multiple app initialization
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

// ✅ Prevent multiple auth initialization
let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = initializeAuth.getInstance
    ? initializeAuth.getInstance(app)
    : null;
}

export { auth };

