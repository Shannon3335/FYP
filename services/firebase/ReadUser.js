import { db } from './FirebaseApp.js'
import { doc, getDoc } from "firebase/firestore"


const ReadUser= async(props) =>{
  // console.log(props.userID)
  const docSnap = await getDoc(doc(db, "Users", props.userID))
  // console.log(props.userID)
  if (docSnap.exists()) {
    // console.log("User found:", docSnap.data())
    return ({userDetails: docSnap.data()})
  }
  else {
    console.log("User not found")
  }
}

export default ReadUser