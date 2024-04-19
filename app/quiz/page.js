'use client'
import { isAdaptiveTestAtom, isQuizReadyAtom, quizDataAtom } from '@/atoms/quizAtom'
import {
  difficultyAtom,
  industryAndFieldAtom,
  nameAtom,
  previousIncorrectQuestionsAtom,
  userAtom,
} from '@/atoms/userAtom'
import CompletionErrorAlert from '@/components/completion-error-alert'
import QuizTemplate from '@/components/quiz-template'
import QuizTemplateSkeleton from '@/components/quiz-template-skeleton'
import { useCompletion } from 'ai/react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Quiz = () => {
  const router = useRouter()
  const setQuizData = useSetAtom(quizDataAtom)
  const showQuiz = useAtomValue(isQuizReadyAtom)
  const username = useAtomValue(nameAtom)
  const industryAndField = useAtomValue(industryAndFieldAtom)
  const difficulty = useAtomValue(difficultyAtom)
  const previousIncorrectQuestions = useAtomValue(previousIncorrectQuestionsAtom)
  const [isAdaptiveTest, setIsAdaptiveTest] = useAtom(isAdaptiveTestAtom)
  const [error, setError] = useState({ hasError: false, message: '' })
  //Check if a user is logged in and push them to home page if not
  useEffect(() => {
    if (username === '') {
      router.push('/')
    } else {
      if (!isLoading && !isAdaptiveTest) {
        // console.log(isLoading)
        // console.log(previousIncorrectQuestions)
        // complete({ ...industryAndField, previousIncorrectQuestions: previousIncorrectQuestions })
        console.log('sending quiz prompt')
        complete({ ...industryAndField, difficulty: difficulty })
      }
      else{
        setIsAdaptiveTest(false)
        console.log("Back to normal tests now")
      }
    }
  }, [])

  //Call the function to create the ai output
  //Todo; abstract with custom function
  const { complete, isLoading } = useCompletion({
    api: '/api/completionv2',
    onFinish: (_, completion) => {
      //v2 completion code

      console.log('Completion on finish:' + completion)

      const parsed_completion = JSON.parse(completion)
      if (parsed_completion.error) {
        setError({
          hasError: true,
          message: parsed_completion.error,
        })
      } else {
        setQuizData({ quizArray: parsed_completion, isQuizReady: true })
      }
    },
    onError: (error) => {
      console.error('Error when creating completion: ' + error.message)
      setError({
        hasError: true,
        message: error.message,
      })
    },
  })

  return (
    <div>
      {showQuiz ? <QuizTemplate /> : <QuizTemplateSkeleton />}
      {error.hasError && (
        <CompletionErrorAlert
          errorMessage={error.message}
          onClickAction={() => {
            setError({
              hasError: false,
              message: '',
            })
            router.push('/dashboard')
          }}
        />
      )}
    </div>
  )
}

export default Quiz
