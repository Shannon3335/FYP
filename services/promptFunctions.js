'use server'
import { useCompletion } from 'ai/react'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const adaptiveMCQResponse = useCompletion({
  api: '/api/adaptiveCompletion/createMCQ',
  onFinish: (_, completion) => {
    //Create mcq with the concepts from getConcetpsRequest
    console.log('AdaptiveCompletion createMCQ output:' + completion)
    const parsedCompletion = JSON.parse(completion)
    if (parsedCompletion.error) {
      // setError({
      //   hasError: true,
      //   message: parsedCompletion.error,
      // })
    } else {
      console.log('AdaptiveCompletion createMCQ output:' + parsedCompletion)
      setQuizData({ quizArray: parsedCompletion, isQuizReady: true })
    }
  },
  onError: (error) => {
    console.error('Error when creating completion: ' + error.message)
  },
})

const getConceptsPrompt = useCompletion({
  api: '/api/adaptiveCompletion/getConcepts',
  onFinish: (_, completion) => {
    //Get concepts completion
    const parsedConcepts = JSON.parse(completion)
    console.log('getConcepts completion on finish:' + parsedConcepts)
    setCallAdaptivePrompt({
      ready: true,
      concepts: parsedConcepts,
    })
  },
  onError: (error) => {
    console.error('Error when running getConceptsPrompt: ' + error.message)
  },
})


export { openai, adaptiveMCQResponse, getConceptsPrompt }
