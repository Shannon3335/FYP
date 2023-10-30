'use client'

import { AddUser } from "/firebase/AddUser"

export default function Home() {
  const addUser = async () => {
    console.log("Calling the true Add user function")
    try{
      await AddUser()
    }catch (error){
      console.log("Function call failed")
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      </div>
      <div><button className='border-white border-2' onClick={addUser}>Add User</button>
</div>
    </main>
  )
}
