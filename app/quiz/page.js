'use client'
import { isQuizReadyAtom, quizDataAtom } from '@/atoms/quizAtom'
import { industryAndFieldAtom, nameAtom, userAtom } from '@/atoms/userAtom'
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

  //Check if a user is logged in and push them to home page if not
  useEffect(() => {
    if (username === '') {
      router.push('/')
    } else {
      // console.log(JSON.stringify(user))
      // console.log('user:', user)
      // console.log(username)
      // console.log(field)
      // console.log(industryAndField)
      if (!isLoading) {
        console.log(isLoading)
        complete(industryAndField)
      }
    }
  }, [])

  //Call the function to create the ai output
  const { complete, isLoading } = useCompletion({
    //v1 version using: openai.completion.create()

    // api: '/api/completion',
    // onFinish: (_, completion) => {
    //   console.log('convertToObj value' + completion + '\n END')
    //   setquizArray(ConvertToQuizObjects(completion))
    //   setIsQuestionsGenerated(!isQuestionsGenerated)
    // }

    //v2 version using: openai.chat.completion.create()

    api: '/api/completionv2',
    onFinish: (_, completion) => {
      //v2 completion code
      const parsed_completion = JSON.parse(completion)
      console.log(parsed_completion)
      setQuizData({ quizArray: parsed_completion, isQuizReady: true })
    },
    onError: (error) => {
      console.error('Error when creating completion: ' + error.message)
    },
  })

  // return <div>{quizArray.isQuestionsGenerated ? <QuizTemplate quizArray={quizArray.quizData} /> : <QuizTemplateSkeleton />}</div>
  return <div>{showQuiz ? <QuizTemplate /> : <QuizTemplateSkeleton />}</div>
}

export default Quiz
