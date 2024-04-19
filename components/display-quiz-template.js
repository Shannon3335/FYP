'use client'
import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { useTextFromArray } from '@/services/transitionHooks'

const DisplayQuizTemplate = () => {
  const displayQuestions = [
    {
      jobTitle: 'Fine Arts Instructor',
      question:
        'Which of the following colors typically forms the basis for a warm color palette in watercolour painting?',
      options: ['Blue tones', 'Green tones', 'Red tones', 'Grey tones'],
    },
    {
      jobTitle: 'Embedded Systems Engineer',
      question: 'What is jitter in the context of real-time systems?',
      options: [
        'Variation in processor speed',
        'Variation in memory allocation',
        'Variation in task execution time',
        'Variation in task latency',
      ],
    },
    {
      jobTitle: 'Cloud Data Engineer',
      question: 'What is the full form of HDFS in the context of Big Data?',
      options: [
        'High Disk File System',
        'Hadoop Disk File System',
        'High Definition File System',
        'Hadoop Distributed File System',
      ],
    },
    {
      jobTitle: 'Tax Consultant',
      question: 'What is the calculation for Return on Assets (ROA)?',
      options: [
        'Net Income / Total Assets',
        'Net Income / Total Liabilities',
        'Total Assets / Net Income',
        'Total Liabilities / Net Income',
      ],
    },
  ]
  const transitionDuration = 6000
  const { selectedObject, selectedIndex } = useTextFromArray(transitionDuration, displayQuestions)

  return (
    <div id='main-container' className='flex h-full w-full flex-col items-center'>
      <div id='tagline' className='text-center text-xl'>
        <span className='font-semibold lg:text-2xl'>
          Use the Power of <span className='decoration-3 underline decoration-purple-500'>AI</span> to Prepare for Your
          Next Interview as a
        </span>
        <div>
          <span className='rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent transition-all duration-250 ease-in-out'>
            {selectedObject.jobTitle}
          </span>
        </div>
      </div>
      <Card className='mt-10 flex h-fit w-4/5 flex-col items-center lg:w-4/6'>
        <div id='question' className='min-h-full w-full  py-2 text-lg lg:w-4/5'>
          <p className='text-medium'>Q</p>
          <Card className='transition-all duration-500 ease-in-out lg:h-24 lg:text-center'>
            {selectedObject.question}
          </Card>
          <div
            id='options'
            className='flex w-full flex-col items-start space-y-10 transition-opacity duration-500 ease-in-out lg:flex-row lg:flex-wrap lg:items-end lg:justify-evenly lg:space-y-16'>
            {selectedObject.options.map((option, index) => (
              <Button
                variant={index === selectedIndex ? 'mcq' : 'default'}
                key={option}
                tabIndex={-1}
                className='min-h-fit w-full text-lg lg:w-5/12 lg:flex-none'>
                {option}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default DisplayQuizTemplate
