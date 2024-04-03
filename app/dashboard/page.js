'use client'
import Header from '@/components/header'
import DashboardDrawer from '@/components/dashboardDrawer'
import DisplayQuizTemplate from '@/components/display-quiz-template'

const Dashboard = () => {
  return (
    <main className='flex h-screen w-full flex-col'>
      <Header />
      <DashboardDrawer className='content-start' />
      <DisplayQuizTemplate />
    </main>
  )
}

export default Dashboard
