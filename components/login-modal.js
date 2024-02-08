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
  Link,
} from '@nextui-org/react'
import { PersonIcon } from '@radix-ui/react-icons'
import { LockClosedIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
const LoginModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const backdrop = "blur"
  return (
    <>
      <Button variant='ghost' className='w-2/4' onClick={onOpen}>
        Quiz Me!
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center' backdrop={backdrop}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Log in</ModalHeader>
              <ModalBody>
                <Input
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
                  <Link color='primary' href='#' size='sm'>
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginModal
