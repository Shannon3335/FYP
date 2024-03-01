import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useAtomValue } from 'jotai'
import { resultAtom } from '@/atoms/quizAtom'

//Register only what you need from chartjs for tree shakability (reduces code size when deploying)
ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = (props) => {
  const results = useAtomValue(resultAtom)
  // console.log(JSON.stringify(props))
  console.log('Data:', JSON.stringify(props.data))
  const data = {
    // labels: ['Correct', 'Incorrect'],
    labels: props.labels,
    datasets: [
      {
        label: 'Score',
        // data: [12, 19],
        data: props.data,
        // backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        backgroundColor: props.bgColor,
        // borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderColor: props.borderColor,
        // borderWidth: 1,
        borderWidth: props.borderWidth,
      },
    ],
  }
  return (
    <>
      <Pie data={data} className='flex' />
    </>
  )
}

export default PieChart
