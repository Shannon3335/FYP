import { useAtom, useAtomValue } from 'jotai'
import { Switch } from './ui/switch'
import { previousIncorrectQuestionsAtom } from '@/atoms/userAtom'
import { isAdaptiveTestAtom } from '@/atoms/quizAtom'

const AdaptiveTestingSwitch = () => {
  const disabled = useAtomValue(previousIncorrectQuestionsAtom).length < 5
  const [adaptiveTestingStatus, setAdaptiveTestingStatus] = useAtom(isAdaptiveTestAtom)

  const onCheckedChange = () => {
    setAdaptiveTestingStatus(!adaptiveTestingStatus)
    console.log('adaptive testing mode:' + adaptiveTestingStatus)
    //call api route for first prompt
    //onFinish => call api route for second prompt
    //onFinish => set isQuizReady to true
  }
  return (
    <Switch
      id='adaptive-testing'
      disabled={disabled}
      checked={adaptiveTestingStatus}
      onCheckedChange={onCheckedChange}
    />
  )
}

export default AdaptiveTestingSwitch
