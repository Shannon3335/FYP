import { atom } from 'jotai'
const quizDataAtom = atom(null)
const isQuizOver = false
const activeQuestionNo = atom(0)
const selectedOption = atom(null)
const selectedIndex = atom(null)
const isLastQuestion = atom(false)
const setSelectedIndex = atom(null)

const result = atom({
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
})

const handleOptionSelect = atom(null, (get, set, payload) => {
  setSelectedOption(payload.option)
  setSelectedIndex(payload.index)
})

export { quizDataAtom, isQuizOver, activeQuestionNo, selectedIndex, selectedOption, isLastQuestion, result }
