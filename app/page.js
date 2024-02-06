'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
        className='flex h-full min-h-full w-full flex-col '></div>
      <div>
        <div
          id='NavBar'
          className=' space-between flex w-full flex-row justify-between p-3 font-mono text-sm'>
          <div className='p-2 text-lg '>PREPME</div>
          <section
            id='MiddleLinks'
            className='w-1/4 flex flex-row justify-between'>
            <Button asChild>
              <Link href={'https://github.com/Shannon3335/FYP'} target='_blank'>
                Github
              </Link>
            </Button>

            <Button asChild variant='link'>
              <Link href={'/quiz'}>Quiz</Link>
            </Button>

            <Button asChild variant='link'>
              <Link
                href={
                  'https://docs.google.com/document/d/e/2PACX-1vTqBRxYfns9hSk6zSf4PjvHcnB6FHvNBFE6nIMLnArgitQNd7Ul1jwIw9oOi2Imdg/pub'
                }
                target='_blank'>
                Docs
              </Link>
            </Button>
          </section>
          <Button asChild variant='ghost' onClick={toSignup}>
            <Link href={'/signup'}>Signup</Link>
          </Button>
        </div>
      </div>
      <div className='flex '>asdfsfd</div>
    </main>
  )
}
