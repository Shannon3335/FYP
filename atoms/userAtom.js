import { Atom, useAtom } from "jotai"

const userAtom = atom({
  userName: "",
  industry: "",
  field: "",
  previousIncorrectQuestions: []
})

const editUserAtom = (props) => {
  const [user, modifyUser] = useAtom(userAtom)
  console.log("Initial user atom:"+ JSON.stringify(user))
  modifyUser((prevUser)=>({...prevUser,[props.key]:props.value}))
    console.log("Edited user atom"+ JSON.stringify(user))
}

export default editUserAtom