import React from 'react'
import { useDisclosure } from '@nextui-org/react'

import { Button } from './ui/button'
import SignupForm from './signup-form'
import LoginForm from './login-form'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'

import { Dialog, DialogTrigger, DialogContent } from './ui/dialog'

const TakeQuizModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const backdrop = 'blur'
  return (
    <>
      {/* Dialog version using shadcn ui */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='default' className='' onClick={onOpen}>
            Quiz Me!
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Tabs defaultValue='login' className='space-y-2'>
            <TabsList>
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
        </DialogContent>
      </Dialog>

      {/* Change the modal below into a login component */}
      {/* this is the modal version using next ui */}
      {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center' backdrop={backdrop}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
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
      </Modal> */}
    </>
  )
}

export default TakeQuizModal
