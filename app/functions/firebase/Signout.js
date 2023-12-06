import { auth } from "./FirebaseApp"
import { signOut } from "firebase/auth"

const Signout = (onSignout) => {
  signOut(auth).then(() => { onSignout }
  ).catch((error) => {
    console.log("Error when signing out" + error.message)
  })
}

export default Signout