'use client'
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

const SignupForm = () => {
  const onSubmit = (values) => {
    console.log(values)
  }
  const signupFormSchema = z
    .object({
      username: z.string().min(5).max(25),
      email: z.string().email().min(4),
      // profilePic: z.,
      password: z.string().min(5),
      confirmPassword: z.string(),
      jobTitle: z.string(),
      industry: '',
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'The passwords do not match',
        })
      }
    })

  const form = useForm({ resolver: zodResolver(signupFormSchema) })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='username'
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
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

export default SignupForm
