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
      <div id='options' className='flex w-full flex-col items-start lg:flex-row lg:flex-wrap lg:items-end lg:justify-around'>
        <Card className='min-h-fit w-full lg:w-5/12 lg:flex-none'>
          <Skeleton className='h-10' />
        </Card>
        <Card className='mt-5 min-h-fit w-full lg:ml-0 lg:w-5/12 lg:flex-none'>
          <Skeleton className='h-10' />
        </Card>
        <Card className='mt-5 min-h-fit w-full lg:w-5/12 lg:flex-none'>
          <Skeleton className='h-10' />
        </Card>
        <Card className='mt-5 min-h-fit w-full lg:ml-0 lg:w-5/12  lg:flex-none'>
          <Skeleton className='h-10' />
        </Card>
      </div>
    </div>
  )
}

export default QuizTemplateSkeleton
