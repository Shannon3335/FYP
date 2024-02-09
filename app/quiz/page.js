'use client'
// Code for MCQ logic from: https://www.codevertiser.com/quiz-app-using-reactjs/

import { useRouter } from 'next/navigation'
import { useCompletion } from 'ai/react'
import { useEffect, useState } from 'react'
import ConvertToQuizObjects from '../../services/convertToQuizObject'
import { nameAtom } from '../../atoms/userAtom'
import { industryAndFieldAtom } from '../../atoms/userAtom'
import { useAtomValue } from 'jotai'
import PieChart from '../../components/Piechart/piechart'

const Quiz = () => {
  const router = useRouter()

  //user related values
  const username = useAtomValue(nameAtom)
  const { industry, field } = useAtomValue(industryAndFieldAtom)

  //quiz related values
  const [quizArray, setquizArray] = useState(null)
  const [isQuestionsGenerated, setIsQuestionsGenerated] = useState(false)
  const [activeQuestionNo, setActiveQuestionNo] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })
  const [isLastQuestion, setIsLastQuestion] = useState(false)
  const [isQuizOver, setQuizOver] = useState(false)
  //piechart related values
  const props = {
    data: [result.correctAnswers, result.wrongAnswers],
    labels: ['Correct', 'Incorrect'],
    bgColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
    borderWidth: 1,
  }

  const { completion, input, handleInputChange, handleSubmit, complete } = useCompletion({
    // api route using openai.chat.completion.create()
    api: '/api/completionv2',
    // api route using openai.completion.create()
    // api: '/api/completion',
    initialInput: field,
    onFinish: (_, completion) => {
      //v2 completion code
      // console.log("parsed completion:" , parsed_completion)
      const parsed_completion = JSON.parse(completion)
      setquizArray(parsed_completion)
      setIsQuestionsGenerated(true)
      // v1 completion code
      // console.log('convertToObj value' + completion + '\n END')
      // setquizArray(ConvertToQuizObjects(completion))
      // setIsQuestionsGenerated(!isQuestionsGenerated)
    },
  })

  //useEffect to see what the quiz array holds
  useEffect(() => {
    console.log(quizArray)
  }, [isQuestionsGenerated])

  const verifyAnswer = () => {
    if (selectedOption == quizArray[activeQuestionNo].answer) {
      console.log('correctAnswer!')
      setResult((prev) => ({
        ...prev,
        score: prev.score + 5,
        correctAnswers: prev.correctAnswers + 1,
      }))
    } else {
      console.log('Incorrect Answer :(')
      setResult((prev) => ({ ...prev, wrongAnswers: prev.wrongAnswers + 1 }))
    }
    setSelectedOption(null)
  }

  const nextQuizFlow = () => {
    //Check if you're at the last qestion
    if (isLastQuestion) {
      //if at the last question when submitting, end the quiz
      setQuizOver(true)
    } else {
      //go to the next question
      setActiveQuestionNo((prev) => prev + 1)
      //if at the second last question, set the last question flag
      if (activeQuestionNo === quizArray.length - 2) {
        setIsLastQuestion(true)
      }
    }
  }

  const onClickNext = () => {
    verifyAnswer()
    nextQuizFlow()
  }

  useEffect(() => {
    if (username === '') {
      router.push('/')
    } else {
      console.log(field, industry)
      complete({ field, industry })
    }
  }, [])

  return (
    <div>
      <h1>Quiz</h1>
      <div>
        {isQuestionsGenerated ? (
          !isQuizOver ? (
            <>
              <h2>Question {activeQuestionNo + 1}</h2>
              <p>{quizArray[activeQuestionNo].question}</p>
              <ul>
                {quizArray[activeQuestionNo].options.map((option, index) => (
                  <li key={index}>
                    <button onClick={() => setSelectedOption(option)}>{option}</button>
                  </li>
                ))}
              </ul>
              <button onClick={() => onClickNext()} disabled={selectedOption === null}>
                {!isLastQuestion ? 'Next' : 'Finish'}
              </button>
            </>
          ) : (
            <PieChart {...props} />
          )
        ) : (
          <div>Loading mcq...</div>
        )}
      </div>
    </div>
  )
}

export default Quiz
