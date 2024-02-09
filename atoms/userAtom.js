import { atom } from 'jotai'

const userAtom = atom({
  userName: '',
  industry: '',
  field: '',
  previousIncorrectQuestions: [],
})

export const industryAndFieldAtom = atom((get) => {
  const industry = get(userAtom).industry
  const field = get(userAtom).field

  return { industry, field }
})

export const nameAtom = atom((get) => get(userAtom).userName)

export default userAtom
