'use client'
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Chart } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, Chart)

const TestPie = () => {
  const data = {
    labels: ['One', 'Two', 'Three'],
    datasets: [
      {
        data: [3, 6, 9],
        backgroundColor: ['aqua', 'bloodOrange', 'purple'],
      },
    ],
  }
  const options = {}
  return (
    <div className='chart-container'>
      {/* //replace styling with tailwind later ?*/}
      <h2 style={{ textAlign: 'center' }}>Pie Chart</h2>
      <Pie
        // data={chartData}
        data={data}
        // options={{
        //   plugins: {
        //     title: {
        //       display: true,
        //       text: 'Users Gained between 2016-2020',
        //     },
        //   },
        // }}
        options={options}
      />
    </div>
  )
}

export default TestPie