'use client'
import { auth } from "@/app/functions/firebase/FirebaseApp"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { onAuthStateChanged } from "firebase/auth"
import { createContext, useEffect } from "react"
import { useState } from "react"

//Code from https://github.com/WebDevSimplified/React-Firebase-Auth/blob/master/src/contexts/AuthContext.js

export const AuthContext = createContext()

// export function useAuth() {
//   return useContext(AuthContext)
// }

export function AuthProvider(props) {
  const [authGlobals, setAuthGlobals] = useState({
    currentUser: null,
  })

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    console.log(currentUser)
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setAuthGlobals((previousGlobals) => {
          const newGlobals = JSON.parse(JSON.stringify(previousGlobals))
          newGlobals.currentUser = user
          return newGlobals
        })
      }
      return unsubscribe
    })
  }, [])

  const context = {
    authObj: authGlobals,
    login,
    logout,
    signup
  }

  return (<AuthContext.Provider value={context}>
    {props.children}
  </AuthContext.Provider>)
}