'use client'
import Header from '@/components/header'
import DashboardDrawer from '@/components/dashboardDrawer'
import DisplayQuizTemplate from '@/components/display-quiz-template'
import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { nameAtom } from '@/atoms/userAtom'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
  const router = useRouter()
  const username = useAtomValue(nameAtom)
  useEffect(() => {
    if (username === '') {
      router.push('/')
    }
  }, [])
  return (
    <main className='flex h-screen w-full flex-col'>
      <Header />
      <DashboardDrawer className='content-start' />
      <DisplayQuizTemplate />
    </main>
  )
}

export default Dashboard
