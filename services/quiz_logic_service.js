import { activeQuestionNo, quizDataAtom, result, selectedIndex, selectedOption } from '@/atoms/quizAtom'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

const verifyAnswer = () => {
  const [selectedOptionValue, setSelectedOption] = useAtom(selectedOption)
  const activeQuestionNoValue = useAtomValue(activeQuestionNo)
  const quizDataAtomValue = useAtomValue(quizDataAtom)
  const setResult = useSetAtom(result)
  const setSelectedIndex = useSetAtom(selectedIndex)

  if (selectedOptionValue == quizDataAtomValue.answer) {
    console.log('correct answer')
    setResult((prev) => ({
      ...prev,
      score: prev.score + 5,
      correctAnswers: prev.correctAnswers + 1,
    }))
  } else {
    console.log('incorrect answer')
    setResult((prev) => ({ ...prev, wrongAnswers: prev.wrongAnswers + 1 }))
  }
  setSelectedOption(null)
  setSelectedIndex(null)
}

export { verifyAnswer }