import { atom } from "jotai"

const userAtom = atom({
  userName: "",
  industry: "",
  field: "",
  previousIncorrectQuestions: []
})

// export const industryAndFieldAtom = atom((get) => { industry: get(userAtom).industry, field : get(userAtom).field })
export default userAtom

// export default EditUserAtom