

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgY5TBhJp5VSefuC-t_oTabBtaxAy7Dqg",
  authDomain: "minhthuyet-501c8.firebaseapp.com",
  databaseURL: "https://minhthuyet-501c8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "minhthuyet-501c8",
  storageBucket: "minhthuyet-501c8.appspot.com",
  messagingSenderId: "728005775131",
  appId: "1:728005775131:web:8f3c8398a360e206630dbe",
  measurementId: "G-4Q6VMRVT5R"
};


class FirebaseService {

  static shared = new FirebaseService()
  app = initializeApp(firebaseConfig);
  firestore = getFirestore(this.app);


}

export default FirebaseService;