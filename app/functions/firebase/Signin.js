import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./FirebaseApp"

const Signin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return user = userCredential.user
  } catch (error) {
    console.log("Error code:" + error.code + " error message:" + error.message)
  }
}

export default Signin