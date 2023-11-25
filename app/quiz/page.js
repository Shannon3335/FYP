'use client'

import { useCompletion } from "ai/react"
import { useEffect, useState } from "react"
import ConvertToQuizObjects from "../functions/convertToQuizObject"

export default function Quiz() {
  // const [ QuizArray, setQuizArray ] = useState([])
  const [ quizArray, setquizArray ] = useState(null)
  const [ convertToObjFlag, setConvertToObjFlag ] = useState(false)
  const { completion, input, isLoading,handleInputChange, handleSubmit } = useCompletion({
    onFinish: ()=>{
      console.log("convertToObj value set")
      setConvertToObjFlag(!convertToObjFlag)
    }
  })

  useEffect(()=>{ //convert the AI output to quiz objects
    if(convertToObjFlag && !isLoading){
      console.log("Completion sent to function:"+completion)
      let returnedArray = ConvertToQuizObjects(completion)
      console.log(returnedArray)
      setquizArray(returnedArray)
    }
  },[convertToObjFlag])
  
  useEffect(()=>{
    console.log(quizArray)
    //trigger a function to upload mcq on the screen
  },[quizArray])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
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
