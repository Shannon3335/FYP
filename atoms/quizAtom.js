import { atom } from 'jotai'

const quizDataAtom = atom(null)
const isQuizOver = false
const activeQuestionNo = atom(0)
const selectedOption = atom(null)
const selectedIndex = atom(null)
const isLastQuestion = atom(false)
const result = atom({
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
})

export { quizDataAtom, isQuizOver, activeQuestionNo, selectedIndex, selectedOption, isLastQuestion, result }
