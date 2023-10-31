'use client'

import { AddUser } from "/firebase/AddUser.js"
import { ReadUser } from "/firebase/ReadUser.js"

export default function Home() {

  const addUser = async () => {
    console.log("Calling the true Add user function")
    try{
      await AddUser()
    }catch (error){
      console.log("Function call failed")
    }
  }

  const readUser = async () => {
    console.log("Calling read function")
    try{
      await ReadUser({userID:'xRlUNWGeaqZ8LXYlaNdM'})
    }catch (error){
      console.log("Function call failed")
    }

  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div><button className='border-white border-2' onClick={addUser}>Add User</button>
        <div><button className='radius-2 boredr-green-400 border-4' onClick={readUser}>ReadUser</button></div>
      </div>

</div>
    </main>
  )
}
