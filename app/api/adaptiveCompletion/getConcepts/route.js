import { OpenAIStream, StreamingTextResponse } from 'ai'
import { openai } from '../../completionv2/route'

export const runtime = 'edge'

export async function POST(req) {
  const {prompt} = await req.json()
  // console.log(JSON.stringify(prompt)) 
  
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    max_tokens: 800,
    temperature: 0.6,
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are a helpful assistant. Given a list of questions, create a list of concepts covering the general topics. Group similar concepts under a single concept. The output must follow the format specified below:
        ["concept1", "concept2", "concept3", "concept4", ...]
        `,
      },
      {
        role: 'user',
        content: `{listofQuestions:${prompt}}`,
      },
    ],
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
