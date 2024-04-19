'use client'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { Switch } from './ui/switch'
import { industryAndFieldAtom, previousIncorrectQuestionsAtom } from '@/atoms/userAtom'
import { isAdaptiveTestAtom, isQuizReadyAtom, quizDataAtom } from '@/atoms/quizAtom'
import { useCompletion } from 'ai/react'
import { useToast } from './ui/use-toast'
import { useEffect, useState } from 'react'
import { adaptiveMCQResponse, getConceptsPrompt } from '@/services/promptFunctions'

const AdaptiveTestingSwitch = () => {
  const { toast } = useToast()
  const prevInccorrectQs = useAtomValue(previousIncorrectQuestionsAtom)
  const [callAdaptivePrompt, setCallAdaptivePrompt] = useState(false)
  const disabled = prevInccorrectQs.length < 5
  const [adaptiveTestingStatus, setAdaptiveTestingStatus] = useAtom(isAdaptiveTestAtom)
  const [isChecked, setIsChecked] = useState(adaptiveTestingStatus)
  const industryAndField = useAtomValue(industryAndFieldAtom)
  const setQuizData = useSetAtom(quizDataAtom)
  const setQuizReady = useSetAtom(isQuizReadyAtom)

  useEffect(() => {
    if (callAdaptivePrompt.ready) {
      adaptiveMCQResponse.complete({ ...industryAndField, concepts: callAdaptivePrompt.concepts })
    }
  }, [callAdaptivePrompt])

  // useEffect(() => {
  //   console.log('is adaptive test?:', adaptiveTestingStatus)
  // }, [adaptiveTestingStatus])

  //Can put this in differnt file and export
  

  const onCheckedChange = () => {
    console.log('check changed value rn:' + isChecked)
    if (isChecked) {
      //call the wrapper function that calls both the prompts
      setQuizReady(false)
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
    setIsChecked((prev) => !prev)
    setAdaptiveTestingStatus(isChecked)
  }

  return <Switch id='adaptive-testing' disabled={disabled} checked={isChecked} onCheckedChange={onCheckedChange} />
}

export default AdaptiveTestingSwitch
