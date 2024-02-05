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
    <main>
      <div
        id='MainBody'
        className='flex flex-col w-full min-h-full h-full '
      ></div>
      <div className='flex '>asdfsfd</div>
    </main>
  )
}
