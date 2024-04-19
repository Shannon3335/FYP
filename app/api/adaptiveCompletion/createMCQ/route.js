import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { openai } from '@/services/promptFunctions'

export const runtime = 'edge'

export async function POST(req) {
  const { prompt } = await req.json()
  const { industry, field, concepts } = prompt
  console.log(industry, field, concepts)
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    max_tokens: 1200,
    temperature: 0.7,
    top_p: 1,
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are a multiple choice question quiz generator. You will be given the industry and job title of the user to generate questions for along with a list of concepts. Choose topics randomly from the list of concepts and create a quiz of 3 questions.
        The output must follow the format specified by the delimiters below:
        [{"question": "question", "options": ["option1","option2","option3","option4"], "answer": "option1", "explanation": "explanation1"},{"question": "question", "options": ["option1","option2","option3","option4"], answer: "option3", explanation: "explanation2"},...]
        `,
      },
      {
        role: 'user',
        content: `{jobTitle:${field}, industry:${industry}, listofConcepts : ${concepts}}`,
      },
    ],
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
