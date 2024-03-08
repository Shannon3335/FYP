import DashboardDrawer from '@/components/dashboardDrawer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const Dashboard = () => {
  return (
    <main>
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
