import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './FirebaseApp'

const Signin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    // console.log("Signed in: " + JSON.stringify(user))
    const uid = user.uid
    // console.log("My uid :" + uid)
    return { userID: uid }
  } catch (e) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log('Error code: ' + errorCode + 'Error message: ' + errorMessage)
  }
}

export default Signin
