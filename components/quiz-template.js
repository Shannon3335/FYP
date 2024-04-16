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
  selectedIndexAtom,
  selectedOptionAtom,
  verifyAnswerAtom,
} from '@/atoms/quizAtom'
import { useEffect } from 'react'
import { updateCurrentUser } from '@/services/firebase_service'
import { previousIncorrectQuestionsAtom } from '@/atoms/userAtom'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const PreviousIncorrectQuestions = useAtomValue(previousIncorrectQuestionsAtom)

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

  const onClickFinish = () => {
    onClickNext()
    router.push('/quiz/results')
  }

  useEffect(() => {
    if (isQuizOver === true) {
      //keep track of the user's incorrect questions and save it to the database when the quiz is over
      updateCurrentUser({ PreviousIncorrectQuestions: PreviousIncorrectQuestions })
    }
  }, [isQuizOver])

  return (
    <div
      id='main-container'
      className='flex min-h-screen min-w-full flex-col content-between  lg:items-center lg:justify-around lg:pb-32'>
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
            className='min-h-[72px] w-full whitespace-break-spaces text-lg lg:w-5/12 lg:flex-none'>
            {option}
          </Button>
        ))}
      </div>
      <div className='flex flex-row self-end pt-9 lg:self-center'>
        <Button
          onClick={isLastQuestion ? () => onClickFinish() : () => onClickNext()}
          disabled={selectedOption === null}>
          <PlayIcon className='mr-2 h-4 w-4' />
          {!isLastQuestion ? 'Next' : 'Finish'}
        </Button>
      </div>
    </div>
  )
}

export default QuizTemplate
