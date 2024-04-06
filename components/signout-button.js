import React from 'react'
import { Button } from './ui/button'
import { logOut } from '@/services/firebase_service'
import { useSetAtom } from 'jotai'
import { resetUserAtom } from '@/atoms/userAtom'
import { useRouter } from 'next/navigation'

const SignoutButton = () => {
  const router = useRouter()
  const resetUserDetails = useSetAtom(resetUserAtom)
  const onClickSignout = async () => {
    try {
      await logOut()
      //Reset user atom to the starting defaults
      resetUserDetails()
      router.push('/')
    } catch (error) {
      console.log('Error while signing out...')
    }
  }
  return (
    <Button variant='destructive' onClick={async () => await onClickSignout()}>
      Sign out
    </Button>
  )
}

export default SignoutButton
