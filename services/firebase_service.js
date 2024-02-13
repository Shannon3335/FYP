import { industryAndFieldAtom } from '@/atoms/userAtom'
import { initializeApp, FirebaseApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { Inder } from 'next/font/google'

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

const signUp = async (userName, email, password, jobTitle, industry) => {
  let userCredential = null
  try {
    userCredential = await createUserWithEmailAndPassword(auth, email, password)
  } catch (error) {
    if (!error.message.includes('auth/email-already-in-use')) {
      return { success: false, error: error.message }
    }
  }

  if (!userCredential) return { success: false, error: 'User not created' }

  const user = userCredential.user
  console.log(user)

  await writeUser(user, userName, jobTitle, industry)
  return { success: true, user: user }
}

const writeUser = async (user, Name, JobTitle, Industry) => {
  try {
    await setDoc(doc(db, 'Users', user.uid), {
      Name: Name,
      Industry: Industry,
      JobTitle: JobTitle,
      PreviousIncorrectQuestions: [''],
    })
  } catch (error) {
    console.log('Error adding user to database: ', error)
    throw new Error(`Error writing user: ${error}`)
  }
}

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredential)
    const user = await fetchUser(userCredential.user.uid)
    if (user) {
      return { success: true, user }
    } else {
      return { success: false, error: 'User data not found' }
    }
  } catch (error) {
    console.log('Error when loggin in, ' + error.message)
  }
}

const fetchUser = async (id) => {
  try {
    const userDoc = await getDoc(doc(db, 'Users', id))
    if (userDoc.exists()) {
      console.log(data)
      data = userDoc.data()
      return data
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}

const logOut = async () => {
  try {
    await auth.signOut()
  } catch (error) {
    console.error('Error logging out: ', error)
  }
}

const isLoggedIn = () => {
  return auth.currentUser !== null
}

const getLoggedInUser = async () =>{
  if(auth.currentUser){
    const id = auth.currentUser.uid
    return await fetchUser(id)
  }
}
export { signUp, writeUser, login, fetchUser, logOut, isLoggedIn, getLoggedInUser }
