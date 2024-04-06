import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
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
  // console.log(user)
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
      Difficulty: 'medium',
    })
  } catch (error) {
    console.log('Error adding user to database: ', error)
    throw new Error(`Error writing user: ${error}`)
  }
}

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    // console.log(userCredential)
    // console.log(userCredential.user.uid)
    const user = await fetchUser(userCredential.user.uid)
    if (user) {
      return { success: true, user }
    } else {
      return { success: false, error: 'User data not found' }
    }
  } catch (error) {
    if (error.message.includes('auth/invalid-credential')) {
      return { success: false, error: 'Invalid credentails' }
    }
    console.log('Error when logging in, ' + error.message)
  }
}

const fetchUser = async (id) => {
  try {
    // console.log(id)
    const userDoc = await getDoc(doc(db, 'Users', id))
    // console.log(userDoc)
    if (userDoc.exists()) {
      const data = userDoc.data()
      // console.log(data)
      return data
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}

const updateUser = async (id, payload) => {
  try {
    await updateDoc(doc(db, 'Users', id), payload)
    return { success: true }
  } catch (error) {
    console.error('Error updating user details: ', error.message)
    return { success: false, message: error }
  }
}
const logOut = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error logging out: ', error)
  }
}

const isLoggedIn = () => {
  return auth.currentUser !== null
}

const getLoggedInUser = async () => {
  if (auth.currentUser) {
    const id = auth.currentUser.uid
    return await fetchUser(id)
  }
}

const getCurrentUserId = async () => {
  return auth.currentUser.uid
}

const updateCurrentUser = async (payload) => {
  const id = await getCurrentUserId()
  try {
    updateUser(id, payload)
    return { success: true }
  } catch (error) {
    console.log('Error when updating current user:' + error.message)
    return { success: false, message: error.message }
  }
}
export {
  signUp,
  writeUser,
  login,
  fetchUser,
  logOut,
  isLoggedIn,
  getLoggedInUser,
  updateUser,
  getCurrentUserId,
  updateCurrentUser,
}
