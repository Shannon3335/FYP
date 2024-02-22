import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { PlayIcon } from '@radix-ui/react-icons'
import { select } from '@nextui-org/react'

const QuizTemplate = (props) => {
  //Mock quiz array for testing
  // let quizArray = [
  //   {
  //     question: 'What is the capital of France?',
  //     options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
  //     answer: 'Paris',
  //   },
  //   {
  //     question: 'Which planet is known as the Red Planet?',
  //     options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
  //     answer: 'Mars',
  //   },
  //   {
  //     question: 'Who painted the Mona Lisa?',
  //     options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
  //     answer: 'Leonardo da Vinci',
  //   },
  // ]
  const [isQuizOver, setQuizOver] = useState(false)
  const [activeQuestionNo, setActiveQuestionNo] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [isLastQuestion, setIsLastQuestion] = useState(false)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  const verifyAnswer = () => {
    if (selectedOption == props.quizArray[activeQuestionNo].answer) {
      console.log('correct answer')
      setResult((prev) => ({
        ...prev,
        score: prev.score + 5,
        correctAnswers: prev.correctAnswers + 1,
      }))
    } else {
      console.log('incorrect answer')
      setResult((prev) => ({ ...prev, wrongAnswers: prev.wrongAnswers + 1 }))
    }
    setSelectedOption(null)
    setSelectedIndex(null)
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
      if (activeQuestionNo === props.quizArray.length - 2) {
        setIsLastQuestion(true)
      }
    }
  }

  const handleOptionSelect = (option, index) => {
    setSelectedOption(option)
    setSelectedIndex(index)
  }

  const onClickNext = () => {
    verifyAnswer()
    nextQuizFlow()
  }
  return (
    <div
      id='main-container'
      className='flex min-h-screen min-w-full flex-col content-between items-start lg:items-center lg:justify-around lg:pb-32'>
      {!isQuizOver ? (
        <>
          <div id='question' className='min-h-full w-full py-6 text-2xl lg:w-4/5'>
            {/* <Card>{props.quizArray[activeQuestionNo].question}</Card> */}
            <text className='text-lg'>Q{activeQuestionNo + 1}</text>
            <Card className='lg:h-24 lg:text-center'>{props.quizArray[activeQuestionNo].question}</Card>
          </div>
          <div
            id='options'
            className='flex w-full flex-col items-start space-y-10 lg:flex-row lg:flex-wrap lg:items-end lg:justify-evenly lg:space-y-16'>
            {/* {props.quizArray[activeQuestionNo].options.map((option, index) => ( */}
            {props.quizArray[activeQuestionNo].options.map((option, index) => (
              <Button
                variant={index === selectedIndex ? 'mcq' : 'default'}
                key={option}
                onClick={() => handleOptionSelect(option, index)}
                className='min-h-fit w-full text-lg lg:w-5/12 lg:flex-none'>
                {option}
              </Button>
            ))}
          </div>
          <div className='flex flex-row self-end pt-9 lg:self-center'>
            <Button onClick={() => onClickNext()} disabled={selectedOption === null}>
              <PlayIcon className='mr-2 h-4 w-4' />
              {!isLastQuestion ? 'Next' : 'Finish'}
            </Button>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default QuizTemplate
