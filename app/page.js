'use client'
import DisplayQuizTemplate from '@/components/display-quiz-template'
import Header from '@/components/header'
import { Card } from '@/components/ui/card'

export default function Home() {
  return (
    <main className='flex-column min-h-screen min-w-full'>
      <Header />
      <div className='h-1/5 w-1/5 '>
        <Card>
          <DisplayQuizTemplate />
        </Card>
      </div>
    </main>
  )
}
