import { Card, CardHeader } from './ui/card'

const QuizTemplateSkeleton = () => {
  return (
    <div id='main-container' className='flex flex-row '>
      <Card>Hello</Card>
      <div id='options'>
        <Card>Q1</Card>
        <Card>Q2</Card>
        <Card>Q3</Card>
        <Card>Q4</Card>
      </div>
    </div>
  )
}

export default QuizTemplateSkeleton
