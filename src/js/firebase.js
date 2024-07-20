
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzjYHGVPRy46-ro6dxUzGiRevBeZPYKi4",
  authDomain: "ai-application-6b8f8.firebaseapp.com",
  projectId: "ai-application-6b8f8",
  storageBucket: "ai-application-6b8f8.appspot.com",
  messagingSenderId: "997283704636",
  appId: "1:997283704636:web:eacceeed162e354e04f839",
  measurementId: "G-BQ461G41VM"
};


const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };
export const auth = getAuth(app)

