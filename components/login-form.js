'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { login } from '@/services/firebase_service'
import { useState } from 'react'
import { useAtom } from 'jotai'
import userAtom from '@/atoms/userAtom'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const [user, setUser] = useAtom(userAtom)
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter()

  const onSubmit = () => {
    if (loggedIn === true) {
    }
  }

  const loginFormSchema = z
    .object({
      email: z.string().email({ message: 'Email must be valid' }),
      password: z.string().min(6, { message: 'Password must be atleast 6 characters long' }),
    })
    .refine(
      async (data) => {
        //attempt login
        const response = await login(data.email, data.password)
        console.log(response)
        if (response.success === true) {
          setUser({
            userName: response.user.userName,
            industry: response.user.industry,
            field: response.user.field,
            previousIncorrectQuestions: response.user.previousIncorrectQuestions,
          })
          setLoggedIn(true)
          router.push('/quiz')
        } else {
          return false
        }
      },
      {
        message: 'Username or password incorrect',
        path: ['email', 'password'],
      }
    )
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onSubmit',
  })

  return (
    <main className='flex min-h-full min-w-full flex-col items-stretch'>
      <Card className='flex min-h-max flex-col px-10 py-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              autofocus
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='testing@gmail.com' {...field} type='email' autoComplete='email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} type='password' autoComplete='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='space-y-2'>
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </main>
  )
}

export default LoginForm
