import { db } from './FirebaseApp.js'
import { doc, getDoc } from "firebase/firestore"


export async function ReadUser(props){
    const docSnap = await getDoc(doc(db,'Users',props.userID))
    console.log(props.userID)
    if(docSnap.exists()){
        console.log("User found:", docSnap.data())
    }
    else{
        console.log("User not found")
    }
}

