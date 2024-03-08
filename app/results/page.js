'use client'
import PieChart from '@/components/Piechart/piechart'
import { ScrollArea } from '@/components/ui/scroll-area'

const Results = () => {
  const piechartProps = {
    labels: ['Incorrect', 'Correct'],
    // data: [results.wrongAnswers, results.correctAnswers],
    // data: [8, 2],
    bgColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
    borderWidth: 1,
  }

  return (
    <main className=' flex h-screen flex-row'>
      <ScrollArea className='h-full w-2/3 rounded-md border'></ScrollArea>
      <div className='h-full w-1/3'>
        <PieChart {...piechartProps} />
      </div>
    </main>
  )
}

export default Results
