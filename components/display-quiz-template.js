import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"


const DisplayQuizTemplate = () => {

  const [selectedIndex, setSelectedIndex] = useState(null)

  const DisplayQuestions = [{question:"BLAH BLAH", options:["op1","op2","op3","op4"]}]
  return (
    <div
      id='main-container'
      className='flex p-2 min-w-full flex-col content-between items-start lg:items-center lg:justify-around lg:pb-32'>
      <>
        <div id='question' className='min-h-full w-full py-6 text-2xl lg:w-4/5'>
          <p className='text-lg'>Q1</p>
          <Card className='lg:h-24 lg:text-center'>{DisplayQuestions[0].question}</Card>
        </div>
        <div
          id='options'
          className='flex w-full flex-col items-start space-y-10 lg:flex-row lg:flex-wrap lg:items-end lg:justify-evenly lg:space-y-16'>
          {DisplayQuestions[0].options.map((option, index) => (
            <Button
              variant={index === selectedIndex ? 'mcq' : 'default'}
              key={option}
              onClick={() => setSelectedIndex(index)}
              className='min-h-fit w-full text-lg lg:w-5/12 lg:flex-none'>
              {option}
            </Button>
          ))}
        </div>
      </>
    </div>
  )
}

export default DisplayQuizTemplate