import industries from '@/enums/industry'
import React, { useState } from 'react'

const Dropdown = ({ onIndustryChange }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const handleChange = (e) => {
    const newSelectedIndustry = e.target.value
    setSelectedIndustry(newSelectedIndustry)
    onIndustryChange(newSelectedIndustry)
  }
  // const industries = ['Medicine', 'Science', 'Business', 'Media', 'Engineering', 'Academia']

  return (
    <div className='mx-auto max-w-md bg-white text-slate-700 '>
      <select
        className='text-grey-500 mt-1 w-full rounded-md border p-2'
        value={selectedIndustry}
        onChange={handleChange}
        required>
        {Object.values(industries).map((industry) => (
          <option key={industry} value={industry} className='text-grey-500'>
            {industry}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
