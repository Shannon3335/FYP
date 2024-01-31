'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const toSignup = () => {
    router.push('/signup')
  }

  const toGithub = () => {
    window.open('https://github.com/Shannon3335/FYP', '_blank')
  }

  const toQuiz = () => {
    router.push('/quiz')
  }

  const toLogin = () => {
    router.push('/login')
  }
  return (
    <main
      id='MainContainer'
      className='bg-gradient-to-b from-slate-900 via-purple-900 to-pink-500 flex flex-col min-h-screen h-screen w-full flex-nowrap justify-between'
    >
      <div
        id='NavBar'
        className='flex flex-row justify-between w-full p-3 font-mono text-sm '
      >
        <div id='Logo' className=''>
          PrepME
        </div>
        <div id='MiddleLinks' className='flex flex-row'>
          <button className=' me-8' onClick={toGithub}>
            Github
          </button>
          <div className=' me-8'>Contact</div>
          <div className=''>Design Rules</div>
        </div>
        <div id='SignInButtons' className='flex flex-row'>
          <button
            className='bg-slate-600 hover:bg-blue-700 rounded-lg me-6'
            onClick={toSignup}
          >
            Signup
          </button>
          <button
            className='bg-slate-600 hover:bg-blue-700 rounded-lg'
            onClick={toLogin}
          >
            Login
          </button>
        </div>
      </div>
      <div
        id='MainBody'
        className='flex flex-col w-full min-h-full h-full '
      ></div>
      <div className='flex '>asdfsfd</div>
    </main>
  )
}
