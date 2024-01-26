'use client'

import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"
import { auth } from "../functions/firebase/FirebaseApp"
import { useCompletion } from "ai/react"
import { useEffect, useState } from "react"
import ConvertToQuizObjects from "../functions/convertToQuizObject"
import userAtom from "../../atoms/userAtom"
// import { industryAndFieldAtom } from "../../atoms/userAtom"
import { useAtom } from "jotai"

export default function Quiz() {
  const [user, modifyUser] = useAtom(userAtom)
  // const [jobAndIndustry, modJandI] = useAtom(industryAndFieldAtom)
  const [quizArray, setquizArray] = useState(null)
  const router = useRouter()
  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    initialInput: user.field,
    onFinish: (_, completion) => {
      console.log("convertToObj value" + completion + "\n END")
      setquizArray(ConvertToQuizObjects(completion))
    }
  })
  useEffect(() => console.log(quizArray), [quizArray])

  useEffect(()=>{
    if (user.userName === '') {
      router.push("/")
    }
  })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
            <div>${JSON.stringify(user)}</div>
            <form onSubmit={handleSubmit}>
              <input
                className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2 dark:text-black"
                value={input}
                placeholder="Enter your job title for the questions"
                onChange={handleInputChange}
              />
            </form>
            {completion ? (
              <div className="whitespace-pre-wrap my-4">{completion}</div>
            ) : (
              <div>Enter your job title </div>
            )}
          </div>
        </div>
    </main>
  )
}
