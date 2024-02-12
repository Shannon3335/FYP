'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PersonIcon } from '@radix-ui/react-icons'

const LoginForm = () => {
  const onSubmit = (values) => {
    console.log(values)
  }

  const loginFormSchema = z
    .object({
      email: z.string().email({ message: 'Email must be valid' }),
      password: z.string().min(6, { message: 'Password must be atleast 6 characters long' }),
    })
    .refine(
      async (data) => {
        console.log(data.email)
        //have function to check if email is valid
      },
      {
        message: 'No account with email exists',
        path: ['email'],
      }
    )
    .refine(
      async (data) => {
        console.log(data.email)
        console.log(data.password)
        //have function to check if password matches the respective email
      },
      {
        message: 'Incorrect password',
        path: ['password'],
      }
    )
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
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
                    <Input placeholder='testing@gmail.com' {...field} type='email' autoComplete='username'/>
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
                    <Input placeholder='' {...field} type='password' autoComplete='current-password'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='space-y-2'>Submit</Button>
          </form>
        </Form>
      </Card>
    </main>
  )
}

export default LoginForm
