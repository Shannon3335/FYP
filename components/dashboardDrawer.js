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
                <span className='flex flex-row'>
                  <GearIcon className='mr-2 h-4 w-4' />
                  Settings
                </span>
              </Button>
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <Button asChild variant='ghost'>
            <Link
              href={
                'https://docs.google.com/document/d/e/2PACX-1vTqBRxYfns9hSk6zSf4PjvHcnB6FHvNBFE6nIMLnArgitQNd7Ul1jwIw9oOi2Imdg/pub'
              }
              target='_blank'>
              Docs
            </Link>
          </Button>
          <Button asChild variant='ghost'>
            <Link href={'https://github.com/Shannon3335/FYP'} target='_blank'>
              Github
            </Link>
          </Button>
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
