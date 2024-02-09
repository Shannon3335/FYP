'use client'
//Code made with the help of https://github.com/tomphill/shadcn-form-tut to understand react form operation.
//Replaced all inner components with shadcn ui components
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CheckIcon, CaretSortIcon } from '@radix-ui/react-icons'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { industryOptions } from '@/components/industry-dropdown'
const SignupForm = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

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
      password: z.string().min(6, { message: 'Password must be atleast 6 characters long' }),
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
      <Card className='flex max-w-md flex-col self-center'>
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
                    <Input placeholder='******' {...field} />
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
                    <Input placeholder='' {...field} />
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
                  <br/>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          aria-expanded={open}
                          className='w-full justify-between'>
                          {value
                            ? industryOptions.find((industry) => industry.value === value).label
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
                              key={industry.value}
                              value={industry.value}
                              onSelect={(currentValue) => {
                                setValue(currentValue === value ? '' : currentValue)
                                setOpen(false)
                              }}>
                              <CheckIcon
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  value === industry.value ? 'opacity-100' : 'opacity-0'
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
