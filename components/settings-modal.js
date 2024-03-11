import { GearIcon } from '@radix-ui/react-icons/dist'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import SettingsForm from './settings-form'

const SettingsModal = () => {
  //use the atom values for the default values of the form

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
