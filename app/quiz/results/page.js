'use client'
import { quizArrayAtom, resetQuizAtoms, resultAtom } from '@/atoms/quizAtom'
import { nameAtom } from '@/atoms/userAtom'
import PieChart from '@/components/Piechart/piechart'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAtomValue, useSetAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Results = () => {
  const quizArray = useAtomValue(quizArrayAtom)
  const result = useAtomValue(resultAtom)
  const resetQuizVariables = useSetAtom(resetQuizAtoms)
  const username = useAtomValue(nameAtom)
  const score = result.score
  const router = useRouter()
  //Set these values below for testing purposes

  const piechartProps = {
    labels: ['Incorrect', 'Correct'],
    // data: [results.wrongAnswers, results.correctAnswers],
    // data: [8, 2],
    bgColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
    borderWidth: 1,
  }

  useEffect(() => {
    if (username === '') {
      router.push('/')
    }
  }, [])
  return (
    <main className='flex h-screen flex-col lg:flex-row lg:items-start'>
      <div className='lg:w-2/3'>
        <ScrollArea className='h-full w-full rounded-md border lg:h-full'>
          <div className='p-4'>
            <h4 className='mb-4 text-center text-xl font-bold leading-none lg:text-start'>Results</h4>
            <div className='flex w-3/5 flex-col self-center lg:hidden lg:w-1/3'>
              <Card className='m-6'>
                <div className='bg-primary-foreground text-center text-xl font-bold'>
                  Score : {score}/{quizArray.length}
                </div>
                <PieChart {...piechartProps} />
              </Card>
            </div>
            <div className='space-y-4'>
              {quizArray.map((questionObj, index) => (
                <div key={index}>
                  <div className='text-sm font-semibold'>
                    Q{index + 1}. {questionObj.question}
                  </div>
                  <div
                    className='flex w-full flex-col items-start pl-4 lg:flex-col lg:flex-wrap 
                  lg:justify-evenly '>
                    {questionObj.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        {optionIndex + 1 + ') '}
                        {option}
                      </div>
                    ))}
                  </div>
                  <div className='font-bold text-green-600'>Answer: {questionObj.answer}</div>
                  <div className='font-medium text-orange-400'>Explanation: {questionObj.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
      <div className='hidden w-3/5 flex-col content-center lg:flex lg:w-1/3'>
        <Card className='m-6'>
          <div className='bg-primary-foreground text-center text-xl font-bold'>
            Score : {score}/{quizArray.length}
          </div>
        </Card>
        <div className='flex w-full'>
          <PieChart {...piechartProps} />
        </div>
      </div>
      <Button asChild className='mb-4 self-end' onClick={() => resetQuizVariables()}>
        <Link href={'/dashboard'}>Dashboard</Link>
      </Button>
    </main>
  )
}

export default Results
