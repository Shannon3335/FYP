'use client'

import * as React from 'react'
// import { Check, ChevronsUpDown } from 'lucide-react'
import { CheckIcon, CaretSortIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import industries from '@/enums/industry'

export const industryOptions = Object.entries(industries).map(([industryKey, industryValue]) => ({
  label: industryKey,
  value: industryValue,
}))

const IndustryDropDown = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'>
          {value
            ? industryOptions.find((industry) => industry.value === value).label
            : 'Industry'}

          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
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
  )
}
export default IndustryDropDown
