'use client'
//Code made with the help of https://github.com/tomphill/shadcn-form-tut to understand react form operation.
//Replaced all inner components with shadcn ui components
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CheckIcon, CaretSortIcon } from '@radix-ui/react-icons'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { industryOptions } from '@/components/industry-dropdown'
import industries from '@/enums/industry'
import { signUp } from '@/services/firebase_service'
import { useRouter } from 'next/navigation'
import { useAtom } from 'jotai'
import { userAtom } from '@/atoms/userAtom'

const SignupForm = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [user, setUser] = useAtom(userAtom)
  const onSubmit = (values) => {
    console.log(values)
    //Sign the user in with the details they've given us
    console.log(signUp(values.userName, values.email, values.password, values.jobTitle, values.industry))
    setUser({
      userName: values.userName,
      industry: values.industry,
      field: values.jobTitle,
      previousIncorrectQuestions: [],
      difficulty: 'medium',
    })
    router.push('/dashboard')
  }

  const signupFormSchema = z
    .object({
      userName: z
        .string()
        .min(5, { message: 'Username must be atleast 5 characters' })
        .max(25, { message: 'username must be less than 25 characters' }),
      email: z.string().email({ message: 'Email must be valid' }),
      // profilePic: z.,
      password: z.string().min(6, { message: 'Password must be atleast 6 characters long' }),
      confirmPassword: z.string(),
      jobTitle: z.string(),
      industry: z.string({ required_error: 'Please select an option.' }).refine(
        (value) => {
          console.log(value)
          return Object.values(industries).includes(value)
        },
        {
          message: 'Invalid industry, does not exist in our current list',
          path: ['industry'],
        }
      ),
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
    <main className='flex min-h-full min-w-full flex-col items-stretch'>
      <Card className='flex min-h-max flex-col px-10 py-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='userName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='shanmeister' {...field} autoComplete='username' />
                  </FormControl>
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
                    <Input placeholder='testing@gmail.com' {...field} type='email' />
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
                    <Input {...field} type='password' />
                  </FormControl>
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
                    <Input placeholder='' {...field} type='password' autoComplete='new-password' />
                  </FormControl>
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
                  <br />
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          aria-expanded={open}
                          className='w-full justify-between'>
                          {field.value
                            ? industryOptions.find((industry) => industry.value === field.value)?.label
                            : 'Industry'}
                          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-full p-0'>
                      <Command>
                        <CommandInput placeholder='Search...' className='h-9' />
                        <CommandEmpty>Not found</CommandEmpty>
                        <CommandGroup>
                          {industryOptions.map((industry) => (
                            <CommandItem
                              key={industry.label}
                              value={industry.label}
                              onSelect={(currentValue) => {
                                console.log(currentValue, field.value)
                                console.log(industry.label, industry.value)
                                // setValue(currentValue === field.value ? '' : currentValue)
                                form.setValue('industry', industry.value)
                                setOpen(false)
                              }}>
                              <CheckIcon
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  field.value === industry.value ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                              {industry.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
