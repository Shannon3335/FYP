// src/components/PieChart.js
import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from "react-chartjs-2"

function PieChart({ chartData }) {
  return (
    <div className="chart-container">
      //replace styling with tailwind later
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2> 
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />
    </div>
  )
}
export default PieChart