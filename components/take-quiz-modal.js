import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Input,
} from '@nextui-org/react'
import { PersonIcon } from '@radix-ui/react-icons'
import { LockClosedIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import Link from 'next/link'
import SignupForm from './signup-form'
import LoginForm from './login-form'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'

const TakeQuizModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const backdrop = 'blur'
  return (
    <>
      <Button variant='default' className='w-2/4' onClick={onOpen}>
        Quiz Me!
      </Button>

      {/* Change the modal below into a login component */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center' backdrop={backdrop}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                {/* replace with a login form component */}
                {/* <Input
                  autoFocus
                  endContent={
                    <PersonIcon className='pointer-events-none flex-shrink-0 text-2xl text-default-400' />
                  }
                  label='Email'
                  placeholder='Enter your email'
                  variant='bordered'
                />
                <Input
                  endContent={
                    <LockClosedIcon className='pointer-events-none flex-shrink-0 text-2xl text-default-400' />
                  }
                  label='Password'
                  placeholder='Enter your password'
                  type='password'
                  variant='bordered'
                />
                <div className='flex justify-between px-1 py-2'>
                  <Checkbox
                    classNames={{
                      label: 'text-small',
                    }}>
                    Remember me
                  </Checkbox>
                  <div>
                    <text className='text-sm '>Not a user?</text>
                    <Button asChild variant='link'>
                      <Link className='pl-1' href={'/signup'}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                </div> */}
                <Tabs defaultValue='login'>
                  <TabsList className='mb-2'>
                    <TabsTrigger value='login'>Login</TabsTrigger>
                    <TabsTrigger value='signup'>Sign Up</TabsTrigger>
                  </TabsList>
                  <TabsContent value='login'>
                    <LoginForm />
                  </TabsContent>
                  <TabsContent value='signup'>
                    <SignupForm />
                  </TabsContent>
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default TakeQuizModal
