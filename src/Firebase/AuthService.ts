import { getAuth, signInWithEmailAndPassword, User, Auth } from "firebase/auth";
import FirebaseService from "./FirebaseService";
import {useDispatch} from "react-redux";
import {setAuth} from "../Redux/AuthRedux";



export class AuthService {
  static shared = new AuthService()

  auth: Auth = undefined as any


  constructor() {
    this.auth = getAuth(FirebaseService.shared.app)
    console.log(getAuth(FirebaseService.shared.app).currentUser)
    this.auth.onAuthStateChanged((user) => {
      console.log(user)
    })

  }
  async login(username: string, password: string) {
    let credential = await  signInWithEmailAndPassword(this.auth, username, password)
  }
}