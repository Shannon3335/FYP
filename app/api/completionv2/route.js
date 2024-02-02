import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json()
  const { industry, field } = prompt
  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    // limit tokens so that the  model doesn't generate overly long prompts
    max_tokens: 800, 
    temperature: 0.6,
    // top_p: 1,
    // frequency_penalty: 1,
    // presence_penalty: 1,

    // Need to keep streaming on, mst explore what I need to do if stream is false
    stream: true,

    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        //System content is the primary context given to the ai model and should be used to give high level context to the ai
        role: 'system',
        content: `You are a multiple choice question quiz generator. You will be given the industry and job title of the user to generate questions for.
          Only return the output in the form of JSON array of objects with the following keys [{question: "question 1", options: ["option a","option b","option c","option d"], answer: "option c"},
          {question: "question 2", options: ["option a","option b","option c","option d"], answer: "option b"} ...]
          `,
      },
      {
        //User context is the secondary content that presents the query and prompt
        role: 'user',
        content: `Given my job title : ${field} and industry : ${industry}, create a multiple choice questions quiz of 10 questions`,
      },
    ],
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
