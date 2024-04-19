import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'
import { useAtomValue } from 'jotai'
import { previousIncorrectQuestionsAtom } from '@/atoms/userAtom'

const HistoryModal = () => {
  const previousIncorrectQuestions = useAtomValue(previousIncorrectQuestionsAtom)
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild className='w-full'>
          <Button variant='ghost'>
            <span className='flex flex-row'>
              <CounterClockwiseClockIcon className='mr-2 h-4 w-4' />
              History
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className='h-4/5'>
          <DialogHeader>
            <DialogTitle>History</DialogTitle>
            <DialogDescription>Revise your previous incorrect questions here</DialogDescription>
            <ScrollArea className='h-96 w-full rounded-md border p-2 md:h-[500px]'>
              <div className='space-y-4 text-left'>
                {previousIncorrectQuestions.slice(1)?.map((questionObj, index) => (
                  <div key={index}>
                    <div className='text-sm font-semibold md:text-sm'>
                      Q{index + 1}. {questionObj.question}
                    </div>
                    <div className='text-sm font-bold text-green-600'>Answer: {questionObj.answer}</div>
                    <div className='text-sm font-medium text-orange-400'>Explanation: {questionObj.explanation}</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default HistoryModal
