'use client'
import DisplayQuizTemplate from '@/components/display-quiz-template'
import Header from '@/components/header'
import { Card } from '@/components/ui/card'

export default function Home() {
  return (
    <main className='flex-column min-h-screen min-w-full'>
      <Header />
      <DisplayQuizTemplate />
    </main>
  )
}
