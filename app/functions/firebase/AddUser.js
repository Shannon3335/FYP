import { collection, addDoc } from "firebase/firestore"
import { db } from "./FirebaseApp.js"

//Code to add a user to the database, using a default user for now
export async function AddUser(props){
    try{
        const docRef = await addDoc(collection(db,'Users'), {
            Username:props.UserName,
            Email: props.email,
            Password: props.password,
            Career : props.Career,
            JobTitle :props.JobTitle,
            PreviousIncorrectQuestions :props.PreviousIncorrectQuestions,
        })
        console.log("Document written with ID: ", docRef.id)
    } catch (e) {
        console.error("Error adding document: ", e)
    }
}
