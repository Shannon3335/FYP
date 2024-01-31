'use client'
// Code for MCQ logic from: https://www.codevertiser.com/quiz-app-using-reactjs/

import { useRouter } from "next/navigation"
import { useCompletion } from "ai/react"
import { useEffect, useState } from "react"
import ConvertToQuizObjects from "../functions/convertToQuizObject"
import { nameAtom } from "../../atoms/userAtom"
import { industryAndFieldAtom } from "../../atoms/userAtom"
import { useAtomValue } from "jotai"

const Quiz = ()=> {

  const username = useAtomValue(nameAtom)
  const { industry, field } = useAtomValue(industryAndFieldAtom)
  const [quizArray, setquizArray] = useState(null)
  const [isQuestionsGenerated, setIsQuestionsGenerated] = useState(false)
  const router = useRouter()
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')

  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0
  })

  const { completion, input, handleInputChange, handleSubmit, complete } = useCompletion({
    // const { completion, input, handleInputChange, handleSubmit, complete } = useCompletion({

    initialInput: field,
    onFinish: (_, completion) => {
      console.log("convertToObj value" + completion + "\n END")
      setquizArray(ConvertToQuizObjects(completion))
      setIsQuestionsGenerated(!isQuestionsGenerated)
    },
  })

  const onClickNext = () => {
    if (selectedOption == quizArray[activeQuestion].answer) {
      console.log("correctAnswer!")
      setResult((prev) => ({
        ...prev,
        score: prev.score + 5,
        correctAnswers: prev.correctAnswers + 1
      }))
    }
    else {
      console.log("Incorrect Answer :(")
      setResult((prev) => ({ ...prev, wrongAnswers: prev.wrongAnswers + 1 }))
    }
    activeQuestion === quizArray.length - 1 ? (console.log(JSON.stringify(result))) : (setActiveQuestion((prev) => prev + 1))
  }
  const onClickOption = (option) => {
    setSelectedOption(option)
  }

  useEffect(() => {
    if (username === '') {
      router.push("/")
    }
    else {
      complete({ field, industry })
    }
  }, [])
  return (
    <div>
      <h1>Quiz</h1>
      <div>
        {
          isQuestionsGenerated ? (
            // activeQuestion === quizArray.length - 1 ? (
              <>
                <h2>Question {activeQuestion + 1}</h2>
                <p>{quizArray[activeQuestion].question}</p>
                <ul>
                  {
                    quizArray[activeQuestion].options.map((option, index) => (
                      <li key={index}><button onClick={() => {
                        onClickOption(option)
                        console.log(option)
                      }}>{option}</button></li>
                    ))}
                </ul>
                <button onClick={() => {
                  onClickNext()
                }}>{activeQuestion === quizArray.length ? 'Finish' : 'Next'}</button>
              </>
            ) :  <div>Loading mcq...</div>
          // ) : 
          // <PieChart chartData={chartData}/>
        }
      </div>
    </div>
  )
}


export default Quiz