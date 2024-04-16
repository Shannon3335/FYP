import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Set the runtime to edge for best performance
/* what is edge runtime? Edge runtime is a subset of fetch api provided by vercel 
that converts code into functions executed and managed by Vercel's edge network, ie, closer
to your server
Pros: Faster cold boot times, higher scalability
Cons: Only some of the libraries available to node.js are available for edge runtime, with a cap on memory space
  */
export const runtime = 'edge'

export async function POST(req) {
  const { prompt } = await req.json()
  const { industry, field } = prompt
  //print the value of the prompt object to see what the value it will give is
  // console.log(prompt)
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    stream: true,
    temperature: 0.6,
    max_tokens: 750,
    prompt: `Job Title: ${field}
        Role Description: Generate 10 multiple-choice questions for a ${industry} interview.
        Each question should have four options (a, b, c, d) with one correct answer.
        Ensure that the questions cover a range of technical topics relevant to the role of a ${field}.
Ensure that the questions and answer choices strictly follow the format below and the answer shows the correct option choice:
Q1. Question
a. [Option a]
b. [Option b]
c. [Option c]
d. [Option d]
Answer:[Correct Option]

Q2. Question
a. [Option a]
b. [Option b]
c. [Option c]
d. [Option d]
Answer:[Correct Option]
...
Note: Ensure that the questions align with the technical skills and knowledge relevant to ${field}
`,
  })
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
