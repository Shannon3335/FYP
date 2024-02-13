import { useAtom } from 'jotai'
import { login } from './firebase_service'
import userAtom from '@/atoms/userAtom'

class LoginService {
  constructor() {
    const [user, setUser] = useAtom(userAtom)
  }

  loginUserandSetState = async (email, password) => {
    response = await login(email, password)
    //set the user atom with the user details if they've been successfully logged in, else fail
    if (response.success === true && response.user !== null) {
      console.log(response.user)
      setUser(response.user)
      return details
    }
  }
}

export default LoginService