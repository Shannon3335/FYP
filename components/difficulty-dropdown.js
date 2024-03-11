'use client'
// import { Check, ChevronsUpDown } from 'lucide-react'
import { CheckIcon, CaretSortIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import difficulties from '@/enums/difficulty'
import { difficultyAtom } from '@/atoms/userAtom'
import { useAtomValue } from 'jotai'

export const difficultyOptions = Object.entries(difficulties).map(([difficultyKey, difficultyValue]) => ({
  label: difficultyKey,
  value: difficultyValue,
}))

const DifficultyDropdown = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const difficulty = useAtomValue(difficultyAtom)
  const defaultValue = difficulty === '' ? 'Difficulty' : difficulty
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
          {value ? difficultyOptions.find((difficulty) => difficulty.value === value).label : defaultValue}
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search...' className='h-9' />
          <CommandEmpty>Not found</CommandEmpty>
          <CommandGroup>
            {difficultyOptions.map((difficulty) => (
              <CommandItem
                key={difficulty.value}
                value={difficulty.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}>
                <CheckIcon className={cn('mr-2 h-4 w-4', value === difficulty.value ? 'opacity-100' : 'opacity-0')} />
                {difficulty.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
export default DifficultyDropdown
