import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons/dist'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { industryOptions } from './industry-dropdown'
import { difficultyOptions } from './difficulty-dropdown'
import { useState } from 'react'
import { z } from 'zod'
import difficulties from '@/enums/difficulty'
import industries from '@/enums/industry'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom, useSetAtom } from 'jotai'
import { clearPreviousIncorrectQuestions, difficultyAtom, industryAndFieldAtom } from '@/atoms/userAtom'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command'
import { cn } from '@/lib/utils'
import { updateCurrentUser } from '@/services/firebase_service'
import { DialogClose } from './ui/dialog'

const SettingsForm = () => {
  const [openIndustry, setIndustryOpen] = useState(false)
  const [openDifficulty, setDifficultyOpen] = useState(false)

  //use the atom values for the default values of the form
  const [userCurrentIndustryAndField, setCurrentIndustryandField] = useAtom(industryAndFieldAtom)
  const [userCurrentDifficulty, setCurrentDifficulty] = useAtom(difficultyAtom)
  const resetPreviousQuestions = useSetAtom(clearPreviousIncorrectQuestions)

  const settingsFormSchema = z.object({
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
    difficulty: z.string({ required_error: 'Please select an option.' }).refine(
      (value) => {
        console.log(value)
        return Object.values(difficulties).includes(value)
      },
      {
        message: 'Please choose a difficulty from the given list.',
        path: ['difficulty'],
      }
    ),
  })
  const saveChanges = async (values) => {
    //call firebase function to write the new details
    //update the atoms to use these values
    try {
      await updateCurrentUser({
        //update the current user's details and reset their previous incorrect questions
        Industry: values.industry,
        JobTitle: values.jobTitle,
        Difficulty: values.difficulty,
        PreviousIncorrectQuestions: [''],
      })
      setCurrentDifficulty(values.difficulty)
      setCurrentIndustryandField({
        industry: values.industry,
        field: values.jobTitle,
      })
      resetPreviousQuestions()
    } catch (error) {}
    console.log('Change these details:', values)
  }

  const form = useForm({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      jobTitle: userCurrentIndustryAndField.field,
      industry: userCurrentIndustryAndField.industry,
      difficulty: userCurrentDifficulty,
    },
    reValidateMode: 'onSubmit',
  })
  return (
    <main className='flex min-h-full min-w-full flex-col items-stretch'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(saveChanges)} className='space-y-4'>
          <FormField
            control={form.control}
            name='jobTitle'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  {/* <Input defaultValue={userCurrentIndustryAndField.field} {...field} /> */}
                  <Input {...field} />
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
                <Popover open={openIndustry} onOpenChange={setIndustryOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={openIndustry}
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
                              // console.log(currentValue, field.value)
                              // console.log(industry.label, industry.value)
                              // setValue(currentValue === field.value ? '' : currentValue)
                              form.setValue('industry', industry.value)
                              setIndustryOpen(false)
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
          <FormField
            control={form.control}
            name='difficulty'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <br />
                <Popover open={openDifficulty} onOpenChange={setDifficultyOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={openDifficulty}
                        className='w-full justify-between'>
                        {field.value
                          ? difficultyOptions.find((difficulty) => difficulty.value === field.value)?.label
                          : 'Difficulty'}
                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0'>
                    <Command>
                      <CommandInput placeholder='Search...' className='h-9' />
                      <CommandEmpty>Not found</CommandEmpty>
                      <CommandGroup>
                        {difficultyOptions.map((difficulty) => (
                          <CommandItem
                            key={difficulty.label}
                            value={difficulty.label}
                            onSelect={(currentValue) => {
                              // console.log(currentValue, field.value)
                              // console.log(difficulty.label, difficulty.value)
                              // setValue(currentValue === field.value ? '' : currentValue)
                              form.setValue('difficulty', difficulty.value)
                              setDifficultyOpen(false)
                            }}>
                            <CheckIcon
                              className={cn(
                                'mr-2 h-4 w-4',
                                field.value === difficulty.value ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                            {difficulty.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <DialogClose asChild>
            <Button type='submit'>Submit</Button>
          </DialogClose>
        </form>
      </Form>
    </main>
  )
}

export default SettingsForm
