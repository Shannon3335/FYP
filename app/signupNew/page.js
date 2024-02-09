'use client'
//Code made with the help of https://github.com/tomphill/shadcn-form-tut to understand react form operation.
//Replaced all inner components with shadcn ui components
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const SignupForm = () => {
  const onSubmit = (values) => {
    console.log(values)
  }
  const signupFormSchema = z
    .object({
      userName: z
        .string()
        .min(5, { message: 'Username must be atleast 5 characters' })
        .max(25, { message: 'username must be less than 25 characters' }),
      email: z.string().email({ message: 'Email must be valid' }),
      // profilePic: z.,
      password: z
        .string()
        .min(6, { message: 'Password must be atleast 6 characters long' }),
      confirmPassword: z.string(),
      jobTitle: z.string(),
      industry: z.string(),
    })
    .refine((data) => data.password == data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })
  //zod checks type safety DURING runtime, which even typescript only extends until build only
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      jobTitle: '',
      industry: '',
    },
  })
  //Zod resolver connects zod to react use form, and revalidates data when it changes
  return (
    <main className='flex min-w-full flex-col content-center'>
      <Card className='flex min-w-max max-w-full flex-col'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='userName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='testing@gmail.com'
                      {...field}
                      type='email'
                    />
                  </FormControl>
                  <FormDescription>Hello</FormDescription>
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
                    <Input placeholder='******' {...field} />
                  </FormControl>
                  <FormDescription>LALAL.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormDescription>Thi.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='jobTitle'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Doctor' {...field} />
                  </FormControl>
                  <FormDescription>Thi.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='industry'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input placeholder='Medicine' {...field} />
                  </FormControl>
                  <FormDescription>aljk;fd</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </Card>
    </main>
  )
}

export default SignupForm
