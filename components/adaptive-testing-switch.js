'use client'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { Switch } from './ui/switch'
import { industryAndFieldAtom, previousIncorrectQuestionsAtom } from '@/atoms/userAtom'
import { isAdaptiveTestAtom, isAdaptiveTestReadyAtom, isQuizReadyAtom, quizDataAtom } from '@/atoms/quizAtom'
import { useCompletion } from 'ai/react'
import { useToast } from './ui/use-toast'
import { useEffect, useState } from 'react'

const AdaptiveTestingSwitch = () => {
  const { toast } = useToast()
  const prevInccorrectQs = useAtomValue(previousIncorrectQuestionsAtom)
  const [callAdaptivePrompt, setCallAdaptivePrompt] = useState({
    ready: false,
    concepts: [],
  })
  const disabled = prevInccorrectQs.length < 5
  const [adaptiveTestingStatus, setAdaptiveTestingStatus] = useAtom(isAdaptiveTestAtom)
  const industryAndField = useAtomValue(industryAndFieldAtom)
  const [quizData, setQuizData] = useAtom(quizDataAtom)
  const setAdaptiveTestReady = useSetAtom(isAdaptiveTestReadyAtom)

  useEffect(() => {
    if (callAdaptivePrompt.ready) {
      console.log('Calling adaptiveMCQ')
      adaptiveMCQResponse.complete({ ...industryAndField, concepts: callAdaptivePrompt.concepts })
    }
  }, [callAdaptivePrompt])

  // useEffect(() => {
  //   console.log('is adaptive test?:', adaptiveTestingStatus)
  // }, [adaptiveTestingStatus])

  // useEffect(() => {
  //   console.log('quizData currently?:', quizData)
  // }, [quizData])

  //Can put this in differnt file and export

  const getConceptsPrompt = useCompletion({
    api: '/api/adaptiveCompletion/getConcepts',
    onFinish: (_, completion) => {
      //Get concepts completion
      const parsedConcepts = JSON.parse(completion)
      console.log('getConcepts completion on finish:', parsedConcepts)
      setCallAdaptivePrompt({
        ready: true,
        concepts: parsedConcepts,
      })
    },
    onError: (error) => {
      console.error('Error when running getConceptsPrompt: ' + error.message)
      setCallAdaptivePrompt({
        ready: false,
        concepts: [],
      })
      setQuizData((prev) => ({ ...prev, quizArray: [], isAdaptiveTestReady: false, isAdaptiveTest: false }))
      toast({
        variant: 'destructive',
        title: 'Someting went wrong...',
        description: 'An error occured while generating your adaptive quiz',
      })
    },
  })

  const adaptiveMCQResponse = useCompletion({
    api: '/api/adaptiveCompletion/createMCQ',
    onFinish: (_, completion) => {
      //Create mcq with the concepts from getConcetpsRequest
      console.log('AdaptiveCompletion createMCQ output:', completion)
      const parsedCompletion = JSON.parse(completion)
      if (parsedCompletion.error) {
        // setError({
        //   hasError: true,
        //   message: parsedCompletion.error,
        // })
      } else {
        console.log('AdaptiveCompletion createMCQ output:' + parsedCompletion)
        setQuizData((prev) => ({ ...prev, quizArray: parsedCompletion, isAdaptiveTestReady: true }))
        toast({
          variant: 'success',
          title: 'Succesfully created quiz!',
          description: 'Your adaptive quiz is ready',
        })
        setCallAdaptivePrompt({
          ready: false,
          concepts: [],
        })
      }
    },
    onError: (error) => {
      console.error('Error when creating completion: ' + error.message)
      setQuizData((prev) => ({ ...prev, quizArray: [], isAdaptiveTestReady: false, isAdaptiveTest: false }))
      toast({
        variant: 'destructive',
        title: 'Someting went wrong...',
        description: 'An error occured while generating your adaptive quiz',
      })
    },
  })

  const onCheckedChange = (isChecked) => {
    if (isChecked) {
      //call the wrapper function that calls both the prompts
      setAdaptiveTestReady(false)
      toast({
        title: 'Generating Adaptive Test',
        description: 'A test catered to you is in the works!',
      })
      const questions = prevInccorrectQs.map((obj) => obj.question)
      console.log('questions being sent to prevIncorrectQs: ' + JSON.stringify(questions))
      getConceptsPrompt.complete(questions)
    } else {
      getConceptsPrompt.stop()
      adaptiveMCQResponse.stop()
    }
    // setIsChecked((prev) => !prev)
    console.log('check changed value rn:' + isChecked)
    setAdaptiveTestingStatus(isChecked)
    console.log('check adaptive status value rn:' + adaptiveTestingStatus)
  }

  return (
    <Switch
      id='adaptive-testing'
      disabled={disabled}
      checked={adaptiveTestingStatus}
      onCheckedChange={(value) => onCheckedChange(value)}
    />
  )
}

export default AdaptiveTestingSwitch
