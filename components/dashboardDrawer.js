import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import Link from 'next/link'
import { Button } from './ui/button'
import { GearIcon } from '@radix-ui/react-icons/dist'
import SettingsModal from './settings-modal'

const DashboardDrawer = () => {
  return (
    <Drawer direction='left'>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent className='min-h-full w-2/6 lg:w-1/5'>
        <div className='flex h-full w-full flex-col items-start space-y-8 pl-2'>
          <DrawerHeader className='w-full'>
            <DrawerTitle>
              <Button variant='ghost'>Statistics</Button>
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <DrawerHeader className='w-full'>
            <DrawerTitle>
              <Button variant='ghost'>History</Button>
            </DrawerTitle>
            <DrawerDescription>View a record of all previous quizes</DrawerDescription>
          </DrawerHeader>
          <DrawerHeader className='w-full'>
            <DrawerTitle>
              <Button variant='ghost'>
                <SettingsModal />
              </Button>
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
        </div>
        <DrawerFooter>
          <DrawerTitle>Really?</DrawerTitle>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant='danger'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default DashboardDrawer
