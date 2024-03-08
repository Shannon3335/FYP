'use client'
import { quizArrayAtom, resultAtom } from '@/atoms/quizAtom'
import PieChart from '@/components/Piechart/piechart'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { useEffect } from 'react'

const Results = () => {
  const [quizArray, setQuizArray] = useAtom(quizArrayAtom)
  const [result, setResults] = useAtom(resultAtom)

  const score = result.score

  //Set these values below for testing purposes
  useEffect(() => {
    setQuizArray([
      {
        question: 'What is the primary goal of a Tech Consultant in a consulting firm?',
        options: [
          'To write code for clients',
          'To analyze business processes and recommend technical solutions',
          'To create marketing strategies for tech products',
          "To manage the company's finances",
        ],
        answer: 'To analyze business processes and recommend technical solutions',
        explanation:
          'Tech Consultants in consulting firms primarily focus on analyzing business processes and providing technical solutions to improve efficiency and effectiveness.',
      },
      {
        question: 'Which of the following is NOT a common responsibility of a Tech Consultant?',
        options: [
          'Managing client relationships',
          'Developing software applications',
          'Designing marketing campaigns',
          'Providing technical expertise to clients',
        ],
        answer: 'Designing marketing campaigns',
        explanation:
          'Tech Consultants typically focus on providing technical expertise, developing solutions, and managing client relationships, rather than designing marketing campaigns.',
      },
      {
        question: 'What is a key challenge that Tech Consultants often face in consulting projects?',
        options: [
          'Lack of technical knowledge',
          'Limited client interaction',
          'Difficulty in understanding business requirements',
          'Overestimating project timelines',
        ],
        answer: 'Difficulty in understanding business requirements',
        explanation:
          'Tech Consultants may face challenges in understanding the unique business requirements of each client, which can impact the success of the project.',
      },
      {
        question: 'Why is effective communication crucial for a Tech Consultant in consulting projects?',
        options: [
          'To show off technical knowledge',
          'To confuse the client with jargon',
          'To ensure client requirements are understood and met',
          'To avoid interacting with stakeholders',
        ],
        answer: 'To ensure client requirements are understood and met',
        explanation:
          'Effective communication is essential for a Tech Consultant to clarify client requirements, align expectations, and ensure the successful implementation of technical solutions.',
      },
      {
        question: 'Which of the following skills is most important for a Tech Consultant?',
        options: ['Public speaking', 'Coding in multiple programming languages', 'Graphic design', 'Time management'],
        answer: 'Time management',
        explanation:
          'Time management is crucial for a Tech Consultant to meet project deadlines, prioritize tasks effectively, and deliver high-quality technical solutions to clients.',
      },
      {
        question: 'What is the primary goal of a Tech Consultant in a consulting firm?',
        options: [
          'To write code for clients',
          'To analyze business processes and recommend technical solutions',
          'To create marketing strategies for tech products',
          "To manage the company's finances",
        ],
        answer: 'To analyze business processes and recommend technical solutions',
        explanation:
          'Tech Consultants in consulting firms primarily focus on analyzing business processes and providing technical solutions to improve efficiency and effectiveness.',
      },
      {
        question: 'Which of the following is NOT a common responsibility of a Tech Consultant?',
        options: [
          'Managing client relationships',
          'Developing software applications',
          'Designing marketing campaigns',
          'Providing technical expertise to clients',
        ],
        answer: 'Designing marketing campaigns',
        explanation:
          'Tech Consultants typically focus on providing technical expertise, developing solutions, and managing client relationships, rather than designing marketing campaigns.',
      },
      {
        question: 'What is a key challenge that Tech Consultants often face in consulting projects?',
        options: [
          'Lack of technical knowledge',
          'Limited client interaction',
          'Difficulty in understanding business requirements',
          'Overestimating project timelines',
        ],
        answer: 'Difficulty in understanding business requirements',
        explanation:
          'Tech Consultants may face challenges in understanding the unique business requirements of each client, which can impact the success of the project.',
      },
      {
        question: 'Why is effective communication crucial for a Tech Consultant in consulting projects?',
        options: [
          'To show off technical knowledge',
          'To confuse the client with jargon',
          'To ensure client requirements are understood and met',
          'To avoid interacting with stakeholders',
        ],
        answer: 'To ensure client requirements are understood and met',
        explanation:
          'Effective communication is essential for a Tech Consultant to clarify client requirements, align expectations, and ensure the successful implementation of technical solutions.',
      },
      {
        question: 'Which of the following skills is most important for a Tech Consultant?',
        options: ['Public speaking', 'Coding in multiple programming languages', 'Graphic design', 'Time management'],
        answer: 'Time management',
        explanation:
          'Time management is crucial for a Tech Consultant to meet project deadlines, prioritize tasks effectively, and deliver high-quality technical solutions to clients.',
      },
    ])
    setResults({
      score: 15,
      correctAnswers: 19,
      wrongAnswers: 5,
    })
  }, [])

  const piechartProps = {
    labels: ['Incorrect', 'Correct'],
    // data: [results.wrongAnswers, results.correctAnswers],
    // data: [8, 2],
    bgColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
    borderWidth: 1,
  }
  return (
    <main className='flex h-screen flex-col lg:flex-row lg:items-start'>
      <div className='lg:w-2/3'>
        <ScrollArea className='h-full w-full rounded-md border lg:h-full'>
          <div className='p-4'>
            <h4 className='mb-4 text-center text-xl font-bold leading-none lg:text-start'>Results</h4>
            <div className='flex w-3/5 flex-col self-center lg:hidden lg:w-1/3'>
              <Card className='m-6'>
                <div className='bg-primary-foreground text-center text-xl font-bold'>
                  Score : {score}/{quizArray.length * 5}
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
                        {optionIndex + 1 + ')'}
                        {option}
                      </div>
                    ))}
                  </div>
                  <div className='font-bold text-green-600'>Answer: {questionObj.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
      <div className='hidden w-3/5 flex-col content-center lg:flex lg:w-1/3'>
        <Card className='m-6'>
          <div className='bg-primary-foreground text-center text-xl font-bold'>
            Score : {score}/{quizArray.length * 5}
          </div>
        </Card>
        <div className='flex w-full'>
          <PieChart {...piechartProps} />
        </div>
      </div>
      <Button asChild className='mb-4 self-end'>
        <Link href={'/dashboard'}>Dashboard</Link>
      </Button>
    </main>
  )
}

export default Results
