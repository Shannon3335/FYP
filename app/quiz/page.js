'use client'
import { isQuizReadyAtom, quizDataAtom } from '@/atoms/quizAtom'
import { industryAndFieldAtom, nameAtom, previousIncorrectQuestionsAtom, userAtom } from '@/atoms/userAtom'
import QuizTemplate from '@/components/quiz-template'
import QuizTemplateSkeleton from '@/components/quiz-template-skeleton'
import { useCompletion } from 'ai/react'
import { useAtom, useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Quiz = () => {
  const router = useRouter()
  const [quizData, setQuizData] = useAtom(quizDataAtom)
  const showQuiz = useAtomValue(isQuizReadyAtom)
  const user = useAtomValue(userAtom)
  const username = useAtomValue(nameAtom)
  const industryAndField = useAtomValue(industryAndFieldAtom)
  const previousIncorrectQuestions = useAtomValue(previousIncorrectQuestionsAtom)

  //Check if a user is logged in and push them to home page if not
  useEffect(() => {
    if (username === '') {
      router.push('/')
    } else {
      if (!isLoading) {
        // console.log(isLoading)
        console.log(previousIncorrectQuestions)
        complete({ ...industryAndField, previousIncorrectQuestions: previousIncorrectQuestions })
      }
    }
  }, [])

  //Call the function to create the ai output
  const { complete, isLoading } = useCompletion({
    // api:
    //   previousIncorrectQuestions.length === 1 && previousIncorrectQuestions.at(0) === ''
    //     ? '/api/completionv2'
    //     : '/api/adaptiveCompletion',
    api: '/api/completionv2',
    onFinish: (_, completion) => {
      //v2 completion code
      const parsed_completion = JSON.parse(completion)
      console.log(JSON.stringify(parsed_completion))
      console.log(parsed_completion)
      setQuizData({ quizArray: parsed_completion, isQuizReady: true })
    },
    onError: (error) => {
      console.error('Error when creating completion: ' + error.message)
    },
  })

  return <div>{showQuiz ? <QuizTemplate /> : <QuizTemplateSkeleton />}</div>
}

export default Quiz
