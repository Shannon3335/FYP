import { errorToJSON } from "next/dist/server/render"
import { auth } from "./FirebaseApp"
import { signOut } from "firebase/auth"

const Signout = (auth, onSignout) => {
  signOut(auth).then(() => { onSignout }
  ).catch((error) => {
    console.log("Error when signing out" + error.message)
  })
}

export default Signout