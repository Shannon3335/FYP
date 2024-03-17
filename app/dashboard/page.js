'use client'
import Link from 'next/link'
import Header from '@/components/header'
import DashboardDrawer from '@/components/dashboardDrawer'
import { Button } from '@/components/ui/button'
import { useRandomTextWithStyle } from '@/services/transitionHooks'

const Dashboard = () => {
  const transitionDuration = 3000
  const ob = {
    'take quiz': 'text-semibold text-red-500 p-15',
    'hello there': 'text-semibold text-white p-15',
    'beep boop': 'text-extrabold text-blue-400 p-2',
  }
  const { text, style } = useRandomTextWithStyle(transitionDuration, ob)

  return (
    <main className='flex h-screen w-full flex-col'>
      <Header />
      <Button asChild variant='secondary'>
        <Link href='/quiz'>
          <div className={`transition-all duration-500 ease-in-out ${style}`}>{text}</div>
        </Link>
      </Button>
      <DashboardDrawer />
    </main>
  )
}

export default Dashboard
