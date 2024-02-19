import { Card } from './ui/card'
import { Skeleton } from './ui/skeleton'
const QuizTemplateSkeleton = () => {
  return (
    <div
      id='main-container'
      className='flex min-h-screen min-w-full flex-col content-between items-start lg:items-center '>
      <div id='question' className=' min-h-full w-full py-6 lg:w-1/2'>
        <Card>
          <Skeleton className='h-32' />
        </Card>
      </div>
      <div id='options' className='lg:wrap flex min-w-full flex-col items-start space-y-5 lg:flex-row lg:space-x-5'>
        <Card className='min-h-fit w-full lg:w-1/2'>
          <Skeleton className='h-5  rounded-md ' />
        </Card>
        <Card className='min-h-fit w-full  lg:w-1/2'>
          <Skeleton className='h-5 rounded-md  ' />
        </Card>
        <Card className='min-h-fit w-full  lg:w-1/2'>
          <Skeleton className='h-5 rounded-md  ' />
        </Card>
        <Card className='min-h-fit w-full  lg:w-1/2'>
          <Skeleton className='h-5 rounded-md  ' />
        </Card>
      </div>
    </div>
  )
}

export default QuizTemplateSkeleton
