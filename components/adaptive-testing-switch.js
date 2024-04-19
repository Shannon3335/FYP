'use client'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { Switch } from './ui/switch'
import { industryAndFieldAtom, previousIncorrectQuestionsAtom } from '@/atoms/userAtom'
import { isAdaptiveTestAtom, quizDataAtom } from '@/atoms/quizAtom'
import { useCompletion } from 'ai/react'
import { useToast } from './ui/use-toast'
import { useEffect, useState } from 'react'

const AdaptiveTestingSwitch = () => {
  const { toast } = useToast()
  const prevInccorrectQs = useAtomValue(previousIncorrectQuestionsAtom)
  const [callAdaptivePrompt, setCallAdaptivePrompt] = useState(false)
  const disabled = prevInccorrectQs.length < 5
  const [adaptiveTestingStatus, setAdaptiveTestingStatus] = useAtom(isAdaptiveTestAtom)
  const industryAndField = useAtomValue(industryAndFieldAtom)
  const setQuizData = useSetAtom(quizDataAtom)
  
  useEffect(() => {
    if (callAdaptivePrompt.ready) {
      adaptiveMCQResponse.complete({ ...industryAndField, concepts: callAdaptivePrompt.concepts })
    }
  }, [callAdaptivePrompt])

  const getConceptsPrompt = useCompletion({
    api: '/api/adaptiveCompletion/getConcepts',
    onFinish: (_, completion) => {
      //Get concepts completion
      console.log('getConcepts completion on finish:' + completion)
      const parsedConcepts = JSON.parse(completion)
      if (parsedConcepts.error) {
        // setError({
        //   hasError: true,
        //   message: parsedConcepts.error,
        // })
        console.log('Error with getConcepts')
      } else {
        //Call the second prompt
        console.log('getConcepts completion on finish:' + parsedConcepts)
        setCallAdaptivePrompt({
          ready: true,
          concepts: parsedConcepts
        })
      }
    },
    onError: (error) => {
      console.error('Error when running getConceptsPrompt: ' + error.message)
      // setError({
      //   hasError: true,
      //   message: error.message,
      // })
    },
  })

  const adaptiveMCQResponse = useCompletion({
    api: '/api/adaptiveCompletion/createMCQ',
    onFinish: (_, completion) => {
      //Create mcq with the concepts from getConcetpsRequest
      console.log('AdaptiveCompletion createMCQ output:' + completion)
      const parsed_completion = JSON.parse(completion)
      if (parsed_completion.error) {
        // setError({
        //   hasError: true,
        //   message: parsed_completion.error,
        // })
      } else {
        console.log('AdaptiveCompletion createMCQ output:' + parsed_completion)
        setQuizData({ quizArray: parsed_completion, isQuizReady: true })
      }
    },
    onError: (error) => {
      console.error('Error when creating completion: ' + error.message)
    },
  })

  const onCheckedChange = (isChecked) => {
    console.log('check changed:' + isChecked)
    setAdaptiveTestingStatus(isChecked)
    if (isChecked) {
      //call the wrapper function that calls both the prompts
      const questions = prevInccorrectQs.map((obj) => obj.question)
      console.log('questions being sent to prevIncorrectQs: ' + JSON.stringify(questions))
      getConceptsPrompt.complete(questions)
    } else {
      getConceptsPrompt.stop()
      adaptiveMCQResponse.stop()
    }
  }

  return (
    <Switch
      id='adaptive-testing'
      disabled={disabled}
      checked={adaptiveTestingStatus}
      onCheckedChange={(isChecked) => onCheckedChange(isChecked)}
    />
  )
}

export default AdaptiveTestingSwitch
