'use client'
//TESTING PAGE FOR PROOF OF CONCEPT OF THE PIE CHART
import { useSetAtom } from 'jotai'
import { quizDataAtom } from '@/atoms/quizAtom'
import QuizTemplate from '@/components/quiz-template'
// import PieChart from '../../components/Piechart/piechart'

const TestPie = () => {
  const setQuizData = useSetAtom(quizDataAtom)
  const parsed_completion = [
    {
      question: 'Which of the following is not a characteristic of cloud computing?',
      options: ['On-demand self service', 'Broad network access', 'Resource pooling', 'High upfront cost'],
      answer: 'High upfront cost',
      explanation:
        'One of the main benefits of cloud computing is its scalable nature and low upfront cost compared to traditional on-premise infrastructures.',
    },
    {
      question: 'Which Google Cloud platform technology is best suited for real-time analytics?',
      options: ['Dataflow', 'Pub/Sub', 'BigQuery', 'DataProc'],
      answer: 'BigQuery',
      explanation:
        "BigQuery is Google's fully managed, NoOps, low cost analytics database. It allows to analyze large datasets in real-time.",
    },
    {
      question: 'What is the process of extracting structured information from unstructured data?',
      options: ['Data Extraction', 'Data Mining', 'Data Partitioning', 'Data Parsing'],
      answer: 'Data Parsing',
      explanation: 'Data parsing is a method where one string of data gets converted into a different type of data.',
    },
    {
      question: 'In a relational database, what does SQL stand for?',
      options: [
        'Structured Query Language',
        'Sequential Query Language',
        'Standard Question Language',
        'Structured Question Language',
      ],
      answer: 'Structured Query Language',
      explanation:
        'SQL stands for Structured Query Language. SQL is used to communicate with a database and SQL is the standard language for relational database management systems.',
    },
    {
      question: 'Which of the following is not a type of NoSQL database?',
      options: ['Column', 'Document', 'Graph', 'Relational'],
      answer: 'Relational',
      explanation:
        'Relational databases are SQL databases, not NoSQL databases. NoSQL databases types include document stores, key-value stores, wide-column stores, and graph databases.',
    },
    {
      question: 'In Hadoop, the process of copying data from local system to the Hadoop file system is called?',
      options: ['Fetching', 'Transferring', 'Uploading', 'Copying'],
      answer: 'Uploading',
      explanation:
        'In Hadoop, uploading refers to the process of copying data from the local system to the Hadoop file system.',
    },
    {
      question: 'What does API stand for in software development?',
      options: [
        'Application Progress Interface',
        'Application Programming Interface',
        'Advanced Programming Interface',
        'Advanced Performance Index',
      ],
      answer: 'Application Programming Interface',
      explanation:
        'API stands for Application Programming Interface. It allows different software programs to communicate with each other.',
    },
    {
      question: "Which of the following is not a component of Google Cloud's Big Data Solution?",
      options: ['Cloud Pub/Sub', 'Cloud Dataflow', 'Cloud Storage', 'Cloud BigTable', 'Google Photos'],
      answer: 'Google Photos',
      explanation:
        "Google Photos is not a component of Google Cloud's Big Data Solution. It's a photo sharing and storage service developed by Google.",
    },
    {
      question: 'Which one of the following is a distributed data processing engine?',
      options: ['Hadoop', 'Spark', 'Flink', 'All of the above'],
      answer: 'All of the above',
      explanation: 'Hadoop, Spark, and Flink are all distributed data processing engines.',
    },
    {
      question: 'In Microsoft Azure, what is the purpose of Azure Data Factory?',
      options: [
        'Data integration service',
        'Data storage service',
        'Data analysis service',
        'Data visualization service',
      ],
      answer: 'Data integration service',
      explanation:
        'Azure Data Factory is a cloud-based data integration service that allows creation of data-driven workflows for orchestrating and automating data movement and data transformation.',
    },
  ]
  setQuizData({ quizArray: parsed_completion, isQuizReady: true })

  return <QuizTemplate />
}

export default TestPie
