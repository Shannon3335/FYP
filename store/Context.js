'use client'
import Signin from "@/app/functions/firebase/Signin"
import { createContext, useEffect, useState } from "react"

const GlobalContext = createContext()
export const GlobalContextProvider = (props) => {
  const [globals, setGlobals] = useState({
    currentuser: null,
    loggedin: false
  })

  const editGlobalData = async (command) => {
    if (command.cmd == "login") {
      try {
        let user = await Signin(command.newVal.email, command.newVal.password)

        setGlobals((previousGlobals) => {
          const newGlobals = JSON.parse(JSON.stringify(previousGlobals))
          newGlobals.currentuser = user
          newGlobals.loggedin = true
        })
      }
      catch (error) { console.log("Error while signing in") }
    }
  }

  const context = {
    updateGlobals: editGlobalData,
    GlobalObject: globals
  }
  return (<GlobalContext.Provider value={context}>
    {props.children}
  </GlobalContext.Provider>)
}

export default GlobalContext