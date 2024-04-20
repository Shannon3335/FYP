'use client'
//TESTING PAGE FOR PROOF OF CONCEPT OF THE PIE CHART
// import PieChart from '../../components/Piechart/piechart'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const TestPie = () => {
  // const previousIncorrectQuestions = [
  //   '',
  //   {
  //     question: 'What is the purpose of Form 886-A?',
  //     answer: 'To explain adjustments or proposed adjustments to income, credits, deductions, or taxable income.',
  //     explanation:
  //       'Tax auditors use Form 886-A to explain adjustments or proposed adjustments to income, credits, deductions, or taxable income.',
  //   },
  //   {
  //     question: 'Under what circumstances can the IRS audit tax returns from more than three years ago?',
  //     answer: 'All of the above.',
  //     explanation:
  //       "The IRS can audit tax returns older than 3 years if there's suspicion of underreported income by 25% or more, in case of unfiled returns, or when they suspect a mistake in calculations.",
  //   },
  //   {
  //     answer: 'They are not deductible.',
  //     explanation: 'Contributions to a Roth IRA are not deductible. Instead, withdrawals in retirement are tax-free.',
  //     question: 'How are contributions to a Roth IRA treated for tax purposes?',
  //   },
  //   {
  //     question: "What is 'Substance Over Form' as referred to in tax audit principles?",
  //     answer: 'The IRS prioritizes the economic substance of transactions over their legal form.',
  //     explanation:
  //       "'Substance Over Form' principle emphasizes the actual economic substance of transactions over their legal form.",
  //   },
  //   {
  //     question: 'The IRS’s AMT (Alternative Minimum Tax) is designed to prevent what?',
  //     explanation:
  //       'The Alternative Minimum Tax (AMT) is a tax law created to ensure high-income individuals, corporations, estates, and trusts pay a minimum amount of tax and do not underpay.',
  //     answer: 'Underpayment of taxes',
  //   },
  //   {
  //     explanation: 'Nonprofit organizations use Form 990 to provide the IRS with the annual financial information.',
  //     question: 'What form do nonprofit organizations use to provide the IRS with the annual financial information?',
  //     answer: 'Form 990',
  //   },
  //   {
  //     answer: 'To report tax withholding by the employer',
  //     explanation:
  //       'Form W-2 is an Internal Revenue Service tax form used in the United States to report wages paid to employees and the taxes withheld from them.',
  //     question: 'What is the purpose of a W-2 form?',
  //   },
  //   {
  //     answer: '3 years',
  //     question: 'Generally, how far back can the IRS audit tax returns?',
  //     explanation:
  //       'IRS policy is to audit tax returns no more than three years old, but there can be exceptions for significant errors.',
  //   },
  //   {
  //     answer: 'A deduction is subtracted from income, while a credit is subtracted from the tax owed',
  //     question: 'What is the difference between a deduction and a credit?',
  //     explanation:
  //       'Tax deductions lower your taxable income and they are equal to the percentage of your marginal tax bracket. Tax credits directly reduce the amount of tax you owe, dollar for dollar.',
  //   },
  //   {
  //     question: 'What is the difference between a progressive tax and a regressive tax?',
  //     explanation:
  //       'A progressive tax takes a larger percentage of income from high-income groups than from low-income groups and is based on the concept of ability to pay. A regressive tax takes a larger percentage from low-income groups than from high-income groups.',
  //     answer: 'A progressive tax increases as income increases, while a regressive tax decreases as income increases',
  //   },
  //   {
  //     answer: "A claim made by the government on a taxpayer's property due to unpaid taxes",
  //     question: 'What is a tax lien?',
  //     explanation: "A tax lien is a legal claim by a government entity against a noncompliant taxpayer's assets.",
  //   },
  //   {
  //     question: 'What is the purpose of IRS Form 8867?',
  //     answer: 'To due diligence checklist for preparers',
  //     explanation:
  //       "IRS Form 8867 is the Paid Preparer's Earned Income Credit Checklist, used by tax preparers to fulfill due-diligence requirements for returns that claim the EIC, the American opportunity credit, and/or the child tax credit/additional child tax credit.",
  //   },
  //   {
  //     question: 'What is the additional standard deduction amount for the blind for the tax year 2022?',
  //     answer: '$1,600',
  //     explanation:
  //       'For tax year 2022, the additional standard deduction amount for the aged or the blind is $1,600. The additional standard deduction amount increases to $1,750 if the individual is also unmarried and not a surviving spouse.',
  //   },
  //   {
  //     question: 'What is the main purpose of Schedule K-1 (Form 1065)?',
  //     answer: 'Report income, deductions, and credits from a partnership',
  //     explanation:
  //       'Schedule K-1 (Form 1065) is used for reporting the distributive share of a partnership income, credits, etc. filed with Form 1065.',
  //   },
  //   {
  //     answer: 'Tax evasion is illegal and tax avoidance is not',
  //     explanation:
  //       "Tax evasion is the illegal evasion of taxes by individuals, corporations, and trusts. Tax avoidance, on the other hand, is the legal usage of the tax regime in a single territory to one's own advantage to reduce the amount of tax that is payable by means that are within the law.",
  //     question: 'What is the difference between tax evasion and tax avoidance?',
  //   },
  // ]
  const [isAdaptiveTest, setisAdaptiveTest] = useState(false)
  const [isAdaptiveTestReady, setisAdaptiveTestReady] = useState(false)
  const router = useRouter()

  return (
    //   <div className='h-screen w-full'>
    //     <div className='h-4/5 p-2'>
    //       <ScrollArea className='h-full w-full rounded-md border p-2'>
    //         <div className='space-y-4'>
    //           {previousIncorrectQuestions.slice(1)?.map((questionObj, index) => (
    //             <div key={index}>
    //               <div className='text-sm font-semibold'>
    //                 Q{index + 1}. {questionObj.question}-
    //               </div>
    //               <div className='font-bold text-green-600'>Answer: {questionObj.answer}</div>
    //               <div className='font-medium text-orange-400'>Explanation: {questionObj.explanation}</div>
    //             </div>
    //           ))}
    //         </div>
    //       </ScrollArea>
    //     </div>
    //   </div>

    <div className='flex flex-row gap-4'>
      <Button
        disabled={isAdaptiveTest ? !isAdaptiveTestReady : false}
        variant={isAdaptiveTest ? 'adaptiveTest' : 'mcq'}
        onClick={() => {
          router.push('/')
        }}>
        Take me homeee
      </Button>
      {/* <Link
        href='/'
        className={buttonVariants({ variant: isAdaptiveTest ? 'adaptiveTest' : 'mcq' })}
        disabled={isAdaptiveTest ? isAdaptiveTestReady : true}>
        Take me homeeee
      </Link> */}
      <Button variant='destructive' onClick={() => setisAdaptiveTest((prev) => !prev)}>
        Is adaptive test
      </Button>
      <Button variant='ghost' onClick={() => setisAdaptiveTestReady((prev) => !prev)}>
        Is test ready
      </Button>
    </div>
  )
}

export default TestPie
