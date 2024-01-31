import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

//Register only what you need from chartjs for tree shakability (reduces code size when deploying)
ChartJS.register(ArcElement, Tooltip, Legend)

const TestPie = () => {
  const data = {
    // labels: ['Correct', 'Incorrect'],
    labels: props.labels,
    datasets: [
      {
        // label: '# of Votes',
        // data: [12, 19],
        data: props.data,

        // backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        backgroundColor: props.bgcolor,

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

export default TestPie
