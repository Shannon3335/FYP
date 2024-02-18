'use client'
import { industryAndFieldAtom, nameAtom } from '@/atoms/userAtom'
import QuizTemplate from '@/components/quiz-template'
import QuizTemplateSkeleton from '@/components/quiz-template-skeleton'
import { useCompletion } from 'ai/react'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const QuizNew = () => {
  const router = useRouter()

  const [quizArray, setquizArray] = useState(null)
  const [isQuestionsGenerated, setIsQuestionsGenerated] = useState(false)
  //user related values
  const username = useAtomValue(nameAtom)
  const { industry, field } = useAtomValue(industryAndFieldAtom)

  //Check if a user is logged in and push them to home page if not
  useEffect(() => {
    if (username === '') {
      //Comment out for testing
      //router.push('/')
    } else {
      console.log(field, industry)
      // To stay in skeleton mode
      // complete({ field, industry })
    }
  }, [])

  // UseEffect to see what quizArray holds
  useEffect(() => {
    console.log(quizArray)
  }, [quizArray])

  //Call the function to create the ai output
  const { complete } = useCompletion({
    //v1 version using: openai.completion.create()

    // api: '/api/completion',
    // onFinish: (_, completion) => {
    //   console.log('convertToObj value' + completion + '\n END')
    //   setquizArray(ConvertToQuizObjects(completion))
    //   setIsQuestionsGenerated(!isQuestionsGenerated)
    // }

    //v2 version using: openai.chat.completion.create()

    api: '/api/completionv2',
    initialInput: field,
    onFinish: (_, completion) => {
      //v2 completion code
      const parsed_completion = JSON.parse(completion)
      setquizArray(parsed_completion)
      setIsQuestionsGenerated(true)
    },
  })

  return <div>{isQuestionsGenerated ? <QuizTemplate quizArray /> : <QuizTemplateSkeleton />}</div>
}

export default QuizNew
