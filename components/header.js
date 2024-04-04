import { EnvelopeOpenIcon, GitHubLogoIcon, HamburgerMenuIcon, HandIcon } from '@radix-ui/react-icons/dist'
import { Button } from './ui/button'
import Link from 'next/link'
import { Separator } from './ui/separator'
import ThemeSwitcher from './theme-switcher'
import TakeQuizModal from './take-quiz-modal'
import { useAtomValue } from 'jotai'
import { nameAtom } from '@/atoms/userAtom'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Image from 'next/image'

const Header = () => {
  const username = useAtomValue(nameAtom)
  return (
    <>
      <div id='header' className='flex flex-row justify-between py-3'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
              <HamburgerMenuIcon className='h-5 w-5' />
              <span className='sr-only'>Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <nav className='grid gap-6 text-lg font-medium'>
              <Button asChild variant='link'>
                <span>
                  <GitHubLogoIcon className='mr-2 h-4 w-4' />
                  <Link href={'https://github.com/Shannon3335/FYP'} target='_blank'>
                    Github
                  </Link>
                </span>
              </Button>
              <Button asChild variant='link'>
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
              <span className='flex w-full justify-center'>
                <ThemeSwitcher />
              </span>
            </nav>
          </SheetContent>
        </Sheet>
        <div id='logo' className=' text-lg md:ml-4'>
          <Image src='/appLogo.svg' alt='Website Logo' width={120} height={100} />
        </div>
        <div
          id='MiddleLinks'
          className='hidden w-auto content-end items-center pl-5 font-mono text-sm md:flex md:flex-row'>
          <Button asChild variant='link'>
            <span>
              <GitHubLogoIcon className='mr-2 h-4 w-4' />
              <Link href={'https://github.com/Shannon3335/FYP'} target='_blank'>
                Github
              </Link>
            </span>
          </Button>
          <Separator orientation='vertical' className='mx-2' />
          <Button asChild variant='link'>
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
        <div id='CornerButtons' className='flex  flex-row content-between items-center'>
          <div className='hidden flex-col content-end pr-4 md:flex'>
            <ThemeSwitcher />
          </div>
          {username === '' ? (
            <div className=''>
              <TakeQuizModal />
            </div>
          ) : (
            <div>
              <Button variant='mcq' asChild>
                <Link href='/quiz'>Take Quiz</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Header
