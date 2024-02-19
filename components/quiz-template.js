import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'

const QuizTemplate = (props) => {
  let quizArray = [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      answer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      answer: 'Mars',
    },
    {
      question: 'Who painted the Mona Lisa?',
      options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
      answer: 'Leonardo da Vinci',
    },
  ]
  const [isQuizOver, setQuizOver] = useState(false)
  const [activeQuestionNo, setActiveQuestionNo] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)

  return (
    <div
      id='main-container'
      className='flex min-h-screen min-w-full flex-col content-between items-start lg:items-center '>
      {!isQuizOver ? (
        <>
          <div id='question' className='min-h-full w-full py-6 text-2xl lg:w-4/5 '>
            {/* <Card>{props.quizArray[activeQuestionNo].question}</Card> */}
            <text className='text-lg'>Q{activeQuestionNo +1}</text>
            <Card className='lg:text-center'>{quizArray[activeQuestionNo].question}</Card>
          </div>
          <div
            id='options'
            className='flex w-full flex-col items-start space-y-10 lg:flex-row lg:flex-wrap lg:items-end lg:justify-around'>
            {/* {props.quizArray[activeQuestionNo].options.map((option, index) => ( */}
            {quizArray[activeQuestionNo].options.map((option, index) => (
              <Button
                variant='mcq'
                key={option}
                onClick={() => setSelectedOption(option)}
                className='min-h-fit w-full lg:w-5/12 lg:flex-none'>
                {option}
              </Button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default QuizTemplate
