import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from './ui/button'
import { CountdownTimerIcon, GearIcon } from '@radix-ui/react-icons/dist'
import SettingsModal from './settings-modal'

const DashboardDrawer = () => {
  return (
    <Drawer direction='left'>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent className='min-h-full w-2/6 lg:w-1/5 '>
        <div className='flex h-full w-full flex-col items-start space-y-8 pl-2'>
          <DrawerHeader className='w-full'>
            <DrawerTitle>
              <Button variant='ghost' asChild>
                <span className='flex w-full flex-row  '>
                  <CountdownTimerIcon className='mr-2 h-4 w-4' />
                  History
                </span>
              </Button>
            </DrawerTitle>
            <DrawerDescription>View a record of all previous quizes</DrawerDescription>
          </DrawerHeader>
          <DrawerHeader className='w-full'>
            <DrawerTitle>
              <SettingsModal />
            </DrawerTitle>
            <DrawerDescription>Change difficulty, job title and other fields</DrawerDescription>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default DashboardDrawer
