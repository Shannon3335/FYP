import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { PlayIcon } from '@radix-ui/react-icons'
import { select } from '@nextui-org/react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { activeQuestionNoAtom, isLastQuestionAtom, isQuizOverAtom, nextQuizFlowAtom, quizArrayAtom, quizDataAtom, selectedIndexAtom, selectedOptionAtom, verifyAnswerAtom } from '@/atoms/quizAtom'

const QuizTemplate = () => {
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

  const quizArray = useAtomValue(quizArrayAtom)
  const isQuizOver = useAtomValue(isQuizOverAtom)
  const activeQuestionNo = useAtomValue(activeQuestionNoAtom)
  const [selectedOption, setSelectedOption] = useAtom(selectedOptionAtom)
  const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom)
  const isLastQuestion = useAtomValue(isLastQuestionAtom)
  const verifyAnswer = useSetAtom(verifyAnswerAtom)
  const nextQuizFlow = useSetAtom(nextQuizFlowAtom)

  const handleOptionSelect = (option, index) => {
    setSelectedOption(option)
    setSelectedIndex(index)
  }

  const onClickNext = () => {
    verifyAnswer()
    //Reset the states to null //look into using jotai reset utils next
    setSelectedIndex(null)
    setSelectedOption(null)
    nextQuizFlow()
  }
  return (
    <div
      id='main-container'
      className='flex min-h-screen min-w-full flex-col content-between items-start lg:items-center lg:justify-around lg:pb-32'>
      {!isQuizOver ? (
        <>
          <div id='question' className='min-h-full w-full py-6 text-2xl lg:w-4/5'>
            <p className='text-lg'>Q{activeQuestionNo + 1}</p>
            <Card className='lg:h-24 lg:text-center'>{quizArray[activeQuestionNo].question}</Card>
          </div>
          <div
            id='options'
            className='flex w-full flex-col items-start space-y-10 lg:flex-row lg:flex-wrap lg:items-end lg:justify-evenly lg:space-y-16'>
            {quizArray[activeQuestionNo].options.map((option, index) => (
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
