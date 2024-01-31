'use client'
//TESTING PAGE FOR PROOF OF CONCEPT OF THE PIE CHART
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const TestPie = () => {
  const data = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  }
  return (
    <>
      <Pie data={data} className='flex' />
    </>
  )
}

export default TestPie
