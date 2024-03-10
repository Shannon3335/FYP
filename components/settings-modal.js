import { CaretSortIcon, CheckIcon, GearIcon } from '@radix-ui/react-icons/dist'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { industryOptions } from './industry-dropdown'
import { difficultyOptions } from './difficulty-dropdown'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import difficulties from '@/enums/difficulty'
import industries from '@/enums/industry'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom, useAtomValue } from 'jotai'
import { difficultyAtom, industryAndFieldAtom } from '@/atoms/userAtom'
import { Card } from './ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command'
import { cn } from '@/lib/utils'
import SettingsForm from './settings-form'

const SettingsModal = () => {
  //use the atom values for the default values of the form
  const saveChanges = (values) => {
    //call firebase function to write the new details
    //update the atoms to use these values
    console.log('Change these details:', values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild className='w-full'>
        <Button variant='ghost'>
          <span className='flex flex-row'>
            <GearIcon className='mr-2 h-4 w-4' />
            Settings
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you are done</DialogDescription>
          <SettingsForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsModal
