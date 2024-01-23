import React, { useState } from 'react';

const Dropdown = ({ onIndustryChange }) => {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const handleChange = (e) => {
    const newSelectedIndustry = e.target.value
    setSelectedIndustry(newSelectedIndustry)
    onIndustryChange(newSelectedIndustry)
  }
  const industries = ['Medicine', 'Science', 'Business', 'Media', 'Engineering', 'Academia'];

  return (
    <div className="max-w-md mx-auto bg-white text-slate-700 ">
      <select
        className="mt-1 p-2 w-full border rounded-md text-grey-500"
        value={selectedIndustry}
        onChange={handleChange}
        required
      >
        {industries.map((industry) => (
          <option key={industry} value={industry} className='text-grey-500'>
            {industry}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown