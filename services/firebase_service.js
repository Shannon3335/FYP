import { initializeApp, FirebaseApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_ATU_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialise Firebase Authentication
export const auth = getAuth(app)
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

//Initialize Firebase Storage
// export const storage = getStorage(app)

const signUp = async (email, password, jobTitle, industry) => {
  let userCredential = null;
  try {
    userCredential = await createUserWithEmailAndPassword(auth, email, password)
  } catch (error) {
    if(!error.message.incldes("auth/email-already-in-use")){
      return { success: false, error: error.message}
    }
  }

  if(!userCredential) return { success: false, error: "User not created"}

  const user = userCredential.user
}
