import { atom } from 'jotai'
import { previousIncorrectQuestionsAtom } from './userAtom'

//Primitive Atoms
const quizDataAtom = atom({ quizArray: [], isQuizReady: false, isAdaptiveTest: false, isAdaptiveTestReady: false })
const isQuizOverAtom = atom(false)
const activeQuestionNoAtom = atom(0)
const selectedOptionAtom = atom(null)
const selectedIndexAtom = atom(null)

const resultAtom = atom({
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
})

//Derived Atoms

// get a boolean value if the the last question is active or not
const isLastQuestionAtom = atom((get) => get(activeQuestionNoAtom) === get(quizArrayAtom).length - 1)
// get and set the quiz array
const quizArrayAtom = atom(
  (get) => get(quizDataAtom).quizArray,
  (get, set, update) => {
    set(quizDataAtom, (prev) => ({
      ...prev,
      quizArray: update,
    }))
  }
)

// get and set if the quiz is ready or not
const isQuizReadyAtom = atom(
  (get) => get(quizDataAtom).isQuizReady,
  (get, set, update) => {
    set(quizDataAtom, (prev) => {
      return {
        ...prev,
        isQuizReady: update,
      }
    })
  }
)

const isAdaptiveTestReadyAtom = atom(
  (get) => get(quizDataAtom).isAdaptiveTestReady,
  (get, set, update) => set(quizDataAtom, (prev) => ({ ...prev, isAdaptiveTestReady: update }))
)

// get and set the adaptiveTestingStatus of the
const isAdaptiveTestAtom = atom(
  (get) => get(quizDataAtom).isAdaptiveTest,
  (get, set, update) => {
    set(quizDataAtom, (prev) => ({
      ...prev,
      isAdaptiveTest: update,
    }))
  }
)
// set the result after getting an answer right
const correctAnswerLogicAtom = atom(null, (get, set, payload) => {
  set(resultAtom, (prev) => ({
    ...prev,
    score: prev.score + 1,
    correctAnswers: prev.correctAnswers + 1,
  }))
})

// set the result after getting an answer wrong
const incorrectAnswerLogicAtom = atom(null, (get, set, payload) => {
  set(resultAtom, (prev) => ({
    ...prev,
    wrongAnswers: prev.wrongAnswers + 1,
  }))
  //Set the previous incorrect questions atom with a new object
  if (!get(isAdaptiveTestAtom)) {
    set(previousIncorrectQuestionsAtom, {
      question: get(activeQuestionAtom),
      answer: get(rightAnswerAtom),
      explanation: get(explainAnsweratom),
    })
  }
})

// handle logic for what happens when verifying an answer
const verifyAnswerAtom = atom(null, (get, set, payload) => {
  if (get(selectedOptionAtom) == get(rightAnswerAtom)) {
    console.log('correct answer')
    set(correctAnswerLogicAtom)
  } else {
    console.log('incorrect answer')
    set(incorrectAnswerLogicAtom)
  }
})

// get the right answer to the current question
const rightAnswerAtom = atom((get) => get(quizArrayAtom)[get(activeQuestionNoAtom)]?.answer)

// get active question
const activeQuestionAtom = atom((get) => get(quizArrayAtom)[get(activeQuestionNoAtom)]?.question)

// get explanation for the active question
const explainAnsweratom = atom((get) => get(quizArrayAtom)[get(activeQuestionNoAtom)]?.explanation)
// handle logic for what happens when moving to the next question
const nextQuizFlowAtom = atom(null, (get, set, payload) => {
  if (get(isLastQuestionAtom)) {
    set(isQuizOverAtom, true)
  } else {
    set(activeQuestionNoAtom, (prev) => prev + 1)
  }
})

// reset the rquired atoms to the initial state for the next quiz
const resetQuizAtoms = atom(null, (get, set, update) => {
  set(quizDataAtom, { quizArray: [], isQuizReady: false, isAdaptiveTest: false, isAdaptiveTestReady: false })
  set(isQuizOverAtom, false)
  set(activeQuestionNoAtom, 0)
  set(selectedOptionAtom, null)
  set(selectedIndexAtom, null)
  set(resultAtom, {
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })
})

export {
  quizDataAtom,
  isQuizOverAtom,
  activeQuestionNoAtom,
  selectedIndexAtom,
  selectedOptionAtom,
  isLastQuestionAtom,
  resultAtom,
  nextQuizFlowAtom,
  verifyAnswerAtom,
  quizArrayAtom,
  isQuizReadyAtom,
  activeQuestionAtom,
  resetQuizAtoms,
  explainAnsweratom,
  isAdaptiveTestAtom,
  isAdaptiveTestReadyAtom,
}
