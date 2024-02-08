'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ThemeSwitcher from '@/components/theme-switcher'
import {
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  HandIcon,
} from '@radix-ui/react-icons'
import { Separator } from '@/components/ui/separator'

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
    <main className='flex-column min-h-screen min-w-full'>
      <div id='header' className='flex flex-row justify-between py-3'>
        <div id='logo' className=' text-lg '>
          <text>PREPME</text>
          <HandIcon className='ml-5 h-4 w-4' />
        </div>
        <div
          id='MiddleLinks'
          className='flex w-1/4 flex-row items-center font-mono text-sm'>
          <Button asChild variant='ghost'>
            <span>
              <GitHubLogoIcon className='mr-2 h-4 w-4' />
              <Link href={'https://github.com/Shannon3335/FYP'} target='_blank'>
                Github
              </Link>
            </span>
          </Button>
          <Separator orientation='vertical' className='mx-2' />
          <Button asChild variant='ghost'>
            <Link href={'/login'}>login</Link>
          </Button>
          <Separator orientation='vertical' className='mx-2' />

          <Button asChild variant='ghost'>
            <span>
              <EnvelopeOpenIcon className='mr-2 h-4 w-4' />
              <Link
                href={
                  'https://docs.google.com/document/d/e/2PACX-1vTqBRxYfns9hSk6zSf4PjvHcnB6FHvNBFE6nIMLnArgitQNd7Ul1jwIw9oOi2Imdg/pub'
                }
                target='_blank'>
                Docs
              </Link>
            </span>
          </Button>
        </div>
        <div
          id='CornerButtons'
          className='w-1/12 flex-row items-center justify-between'>
          <Button asChild variant='ghost' onClick={toSignup}>
            <Link href={'/signup'}>Signup</Link>
          </Button>
          <ThemeSwitcher />
        </div>
      </div>

      <div className='flex  '>asdfsfd</div>
    </main>
  )
}
