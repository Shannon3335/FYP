'use client'

import { AddUser } from "/firebase/AddUser.js"
import { ReadUser } from "/firebase/ReadUser.js"
import { useCompletion } from "ai/react"

export default function Quiz() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion();

  const addUser = async () => {
    console.log("Calling the true Add user function")
    try {
      await AddUser(
        {
          Career: "Engineering",
          JobTitle: "Software Engineer",
          PreviousIncorrectQuestions: ["GADFsdfsadf", "asdfsfd"],
          UserName: "ShannonFernandes?w"
        }
      )
    } catch (error) {
      console.log("Function call failed")
    }
  }

  const readUser = async () => {
    console.log("Calling read function")
    try {
      await ReadUser({ userID: 'xRlUNWGeaqZ8LXYlaNdM' })
    } catch (error) {
      console.log("Function call failed")
    }

  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div><button className='border-white border-2' onClick={addUser}>Add User</button>
          <div><button className='radius-2 boredr-green-400 border-4' onClick={readUser}>ReadUser</button></div>
        </div>
        <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
          <form onSubmit={handleSubmit}>
            <input
              className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2 dark:text-black"
              value={input}
              placeholder="Describe your business..."
              onChange={handleInputChange}
            />
          </form>
          {completion ? (
            <div className="whitespace-pre-wrap my-4">{completion}</div>
          ) : (
            <div>Enter a business description and click enter to generate slogans.</div>
          )}
        </div>

      </div>
    </main>
  )
}
