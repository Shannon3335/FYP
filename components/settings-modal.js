import { GearIcon } from '@radix-ui/react-icons/dist'
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
import { industryAndFieldAtom } from '@/atoms/userAtom'
import { useAtom } from 'jotai'
import IndustryDropDown from './industry-dropdown'
import DifficultyDropdown from './difficulty-dropdown'

const SettingsModal = () => {
  const industryAndField = useAtom(industryAndFieldAtom)
  return (
    <Dialog>
      <DialogTrigger asChild>
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
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='jobTitle' className='text-right'>
              Job Title
            </Label>
            <Input id='jobTitle' defaultValue='Pedro Duarte' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='Industry' className='text-right'>
              Industry
            </Label>
            <IndustryDropDown />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='Difficulty' className='text-right'>
              Difficulty
            </Label>
            <DifficultyDropdown />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type='submit' variant='default' onClick={() => saveChanges()}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsModal
