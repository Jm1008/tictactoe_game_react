import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {getDatabase} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCuhPwKrdYQ35h829QdbjodbVOwrLLKlSw",
  authDomain: "projeto-c57b8.firebaseapp.com",
  databaseURL: "https://projeto-c57b8-default-rtdb.firebaseio.com",
  projectId: "projeto-c57b8",
  storageBucket: "projeto-c57b8.appspot.com",
  messagingSenderId: "360891711010",
  appId: "1:360891711010:web:533664c76778a933d6d47b"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const database =  getDatabase(app);

export {provider, database}