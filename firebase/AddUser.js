import { collection, addDoc } from "firebase/firestore"
import { db } from "./FirebaseApp.js"

//Code to add a user to the database, using a default user for now
export async function AddUser(){
    try{
        const docRef = await addDoc(collection(db,'Users'), {
            Career :"engineer",
            JobTitle :"Software engineer",
            PreviousIncorrectQuestions :["ajlksd","lakhsjdf"],
            UserName : "Shannon"
        })
        console.log("Document written with ID: ", docRef.id)
    } catch (e) {
        console.error("Error adding document: ", e)
    }
}
