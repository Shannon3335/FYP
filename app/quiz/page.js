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

  // const [chartData, setChartData] = useState({
  //   // labels: ["Correct", "Incorrect"],
  //   // datasets: [
  //   //   {
  //   //     label: "Result",
  //   //     data: [result.correctAnswers, result.wrongAnswers],
  //   //     backgroundColor: [
  //   //       "#f3ba2f",
  //   //       "#2a71d0"
  //   //     ],
  //   //     borderColor: "black",
  //   //     borderWidth: 2
  //   //   }
  //   // ]
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  // datasets: [
  //   {
  //     label: '# of Votes',
  //     data: [12, 19, 3, 5, 2, 3],
  //     backgroundColor: [
  //       'rgba(255, 99, 132, 0.2)',
  //       'rgba(54, 162, 235, 0.2)',
  //       'rgba(255, 206, 86, 0.2)',
  //       'rgba(75, 192, 192, 0.2)',
  //       'rgba(153, 102, 255, 0.2)',
  //       'rgba(255, 159, 64, 0.2)',
  //     ],
  //     borderColor: [
  //       'rgba(255, 99, 132, 1)',
  //       'rgba(54, 162, 235, 1)',
  //       'rgba(255, 206, 86, 1)',
  //       'rgba(75, 192, 192, 1)',
  //       'rgba(153, 102, 255, 1)',
  //       'rgba(255, 159, 64, 1)',
  //     ],
  //     borderWidth: 1,
  //   },
  // ]
  // })

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