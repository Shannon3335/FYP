import { useAtom } from 'jotai'
import { login, signUp } from './firebase_service'
import userAtom from '@/atoms/userAtom'

class LoginService {
  loginUserAndSetState = async (email, password) => {
    response = await login(email, password)
    //set the user atom with the user details if they've been successfully logged in, else fail
    if (response.success === true && response.user !== null) {
      console.log(response.user)
      setUser(response.user)
      return details
    }
  }

  logoutUserAndResetState = async () => {
    await logOut()
    setUser({
      //See if I can create a default user object to replace below object. Repeated when initializing userAtom
      userName: '',
      industry: '',
      field: '',
      previousIncorrectQuestions: [],
    })
    //reset user Atom to the default state
  }

  SignUpAndSetState = async (signUpDetails) => {
    response = await signUp(
      signUpDetails.userName,
      signUpDetails.email,
      signUpDetails.password,
      signUpDetails.jobTitile,
      signUpDetails.industry
    )
    if (response.success === true) {
      setUser({
        userName: signUpDetails.userName,
        industry: signUpDetails.industry,
        field: signUpDetails.jobTitile,
        previousIncorrectQuestions: [],
      })
    }
  }
}

export default LoginService
