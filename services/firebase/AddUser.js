import { doc, setDoc } from "firebase/firestore"
import { db } from "./FirebaseApp.js"

//Code to add a user to the database, using a default user for now
export default async function AddUser(props) {
  try {
    await setDoc(doc(db, "Users", props.uid), {
      Name: props.Name,
      Industry: props.Industry,
      JobTitle: props.JobTitle,
      PreviousIncorrectQuestions: props.PreviousIncorrectQuestions,
    })
    console.log("Document written with ID: ", props.uid)
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}
