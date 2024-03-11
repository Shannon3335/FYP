'use client'
//TESTING PAGE FOR PROOF OF CONCEPT OF THE PIE CHART
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import SettingsModal from '@/components/settings-modal'
// import PieChart from '../../components/Piechart/piechart'
ChartJS.register(ArcElement, Tooltip, Legend)

const TestPie = () => {
  return <SettingsModal />
}

export default TestPie
