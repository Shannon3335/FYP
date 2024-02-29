import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'

const quizDataAtom = atom(null)
const isQuizOverAtom = false
const activeQuestionNoAtom = atom(0)
const selectedOption = atom(null)
const selectedIndex = atom(null)
const isLastQuestion = atom(false)

const result = atom({
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
})

const correctAnswerLogicAtom = atom(null, (get, set, payload) => {
  set(result, (prev) => ({
    ...prev,
    score: prev.score + 5,
    correctAnswers: prev.correctAnswers + 1,
  }))
})

const incorrectAnswerLogicAtom = atom(null, (get, set, payload) => {
  set(result, (prev) => ({
    ...prev,
    wrongAnswers: prev.wrongAnswers + 1,
  }))
})

const verifyAnswer = atom(null, (get, set, payload) => {
  if (get(selectedOption) == quizDataAtom[get(activeQuestionNoAtom)].answer) {
    console.log('correct answer')
    set(correctAnswerLogicAtom)
  } else {
    console.log('incorrect answer')
    set(incorrectAnswerLogicAtom)
  }
})

const nextQuizFlowAtom = atom(null, (get, set, payload) => {
  if (get(isLastQuestion)) {
    set(isQuizOverAtom, true)
  } else {
    set(activeQuestionNoAtom, (prev) => prev + 1)
    if (get(activeQuestionNoAtom) === quizDataAtom.length - 2) {
      set(isLastQuestion, true)
    }
  }
})

export {
  quizDataAtom,
  isQuizOverAtom,
  activeQuestionNoAtom,
  selectedIndex,
  selectedOption,
  isLastQuestion,
  result,
  nextQuizFlowAtom,
  verifyAnswer,
}
