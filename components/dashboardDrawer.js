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

const DashboardDrawer = () => {
  return (
    <Drawer direction='left'>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent className='min-h-full w-2/6'>
        <div className='flex h-full flex-col w-full items-start space-y-8 pl-2'>
          <DrawerHeader>
            <DrawerTitle>
              <Button variant='ghost'>Statistics</Button>
            </DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerHeader>
            <DrawerTitle>
              <Button variant='ghost'>History</Button>
            </DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerHeader>
            <DrawerTitle>
              <Button variant='ghost'>Settings</Button>
            </DrawerTitle>
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
