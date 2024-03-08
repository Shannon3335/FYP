import { Button } from './ui/button'
import { Card } from './ui/card'
import { PlayIcon } from '@radix-ui/react-icons'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  activeQuestionAtom,
  activeQuestionNoAtom,
  isLastQuestionAtom,
  isQuizOverAtom,
  nextQuizFlowAtom,
  quizArrayAtom,
  resultAtom,
  selectedIndexAtom,
  selectedOptionAtom,
  verifyAnswerAtom,
} from '@/atoms/quizAtom'
import { useEffect } from 'react'
import PieChart from './Piechart/piechart'
import { getCurrentUserId, updateCurrentUser, updateUser } from '@/services/firebase_service'
import { previousIncorrectQuestionsAtom } from '@/atoms/userAtom'

const QuizTemplate = () => {
  const quizArray = useAtomValue(quizArrayAtom)
  const activeQuestion = useAtomValue(activeQuestionAtom)
  const isQuizOver = useAtomValue(isQuizOverAtom)
  const activeQuestionNo = useAtomValue(activeQuestionNoAtom)
  const [selectedOption, setSelectedOption] = useAtom(selectedOptionAtom)
  const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom)
  const isLastQuestion = useAtomValue(isLastQuestionAtom)
  const verifyAnswer = useSetAtom(verifyAnswerAtom)
  const nextQuizFlow = useSetAtom(nextQuizFlowAtom)
  const results = useAtomValue(resultAtom)

  const PreviousIncorrectQuestions = useAtomValue(previousIncorrectQuestionsAtom)

  const piechartProps = {
    labels: ['Incorrect', 'Correct'],
    data: [results.wrongAnswers, results.correctAnswers],
    bgColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
    borderWidth: 1,
  }
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

  useEffect(() => {
    if (isQuizOver === true) {
      // updateUser('89wF5PQ5JWPkOaxPZRAtttwWtV52', { PreviousIncorrectQuestions: PreviousIncorrectQuestions })
      updateCurrentUser({ PreviousIncorrectQuestions: PreviousIncorrectQuestions })
    }
  }, [isQuizOver])

  return (
    <div
      id='main-container'
      className='flex min-h-screen min-w-full flex-col content-between items-start lg:items-center lg:justify-around lg:pb-32'>
      {!isQuizOver ? (
        <>
          <div id='question' className='min-h-full w-full py-6 text-2xl lg:w-4/5'>
            <p className='text-lg'>Q{activeQuestionNo + 1}</p>
            <Card className='lg:h-24 lg:text-center'>{activeQuestion}</Card>
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
      ) : (
        <PieChart {...piechartProps} />
      )}
    </div>
  )
}

export default QuizTemplate
