'use client'

import DashboardDrawer from '@/components/dashboardDrawer'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Dashboard = () => {
  return (
    <main className='flex h-screen w-full flex-col'>
      <Header />
      <Button asChild variant='secondary'>
        <Link href={'/quiz'}>Take Quiz</Link>
      </Button>
      <div>
        <DashboardDrawer />
      </div>
    </main>
  )
}

export default Dashboard
