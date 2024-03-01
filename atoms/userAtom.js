import { user } from '@nextui-org/react'
import { atom } from 'jotai'

const userAtom = atom({
  userName: '',
  industry: '',
  field: '',
  previousIncorrectQuestions: [],
})

const industryAndFieldAtom = atom((get) => {
  return { industry: get(userAtom).industry, field: get(userAtom).industry }
})

const nameAtom = atom((get) => get(userAtom).userName)

const previousIncorrectQuestions = atom(
  (get) => get(userAtom).previousIncorrectQuestions,
  (get, set, newIncorrectQuestions) => {
    set(userAtom, (prev) => ({
      ...prev,
      previousIncorrectQuestions: [prev.previousIncorrectQuestions + newIncorrectQuestions],
    }))
  }
)

export { userAtom, industryAndFieldAtom, nameAtom, previousIncorrectQuestions }
