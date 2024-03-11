import { atom } from 'jotai'

// Primitive Atom
const userAtom = atom({
  username: '',
  industry: '',
  field: '',
  difficulty: '',
  previousIncorrectQuestions: [''],
})

// Derived Atoms

// get the user's industry and field
const industryAndFieldAtom = atom((get) => {
  return { industry: get(userAtom).industry, field: get(userAtom).field }
})

//get user's preferred difficulty
const difficultyAtom = atom((get) => {
  return get(userAtom).difficulty
})
// get the user's name
const nameAtom = atom((get) => get(userAtom).username)

// get and add to the the user's incorrect questions
const previousIncorrectQuestionsAtom = atom(
  (get) => get(userAtom).previousIncorrectQuestions,
  (get, set, newIncorrectQuestions) => {
    set(userAtom, (prev) => ({
      ...prev,
      previousIncorrectQuestions: [...prev.previousIncorrectQuestions, newIncorrectQuestions],
    }))
  }
)

export { userAtom, industryAndFieldAtom, nameAtom, previousIncorrectQuestionsAtom, difficultyAtom }
