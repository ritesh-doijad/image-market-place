
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCM16-9JGs_neBKxMynqETqz2bjkgDIfXs",
  authDomain: "image-market-1a175.firebaseapp.com",
  projectId: "image-market-1a175",
  storageBucket: "image-market-1a175.appspot.com",
  messagingSenderId: "565702026143",
  appId: "1:565702026143:web:8ff5b5c4f16ef387e913aa"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const firestore=getFirestore(app)