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

const IndustryDropDown = () => {
  const industryTing = Object.entries(industries)

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  console.log(Object.entries(industries))
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'>
          {value
            ? industryTing.find((pair) => pair[1] === value)?
            : 'Industry'}

          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search...' />
          <CommandEmpty>Not found</CommandEmpty>
          <CommandGroup>
            {Object.entries(industries).map(([label, industryValue]) => (
              <CommandItem
                key={industryValue}
                value={industryValue}
                onSelect={(currentValue) => {
                  setValue(currentValue === industryValue ? '' : currentValue)
                  setOpen(false)
                }}>
                <CheckIcon
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === industryValue ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default IndustryDropDown
