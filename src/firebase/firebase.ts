import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";
  
  export const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);
  export const db = getFirestore(app);