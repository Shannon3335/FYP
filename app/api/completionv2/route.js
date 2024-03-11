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
  const difficulty = 'difficult'
  const numberOfQuestions = 10
  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',

    // I can not use the type below since it doesn't return a json array, but a json object.
    // response_format: { "type" : 'json_object' },

    // limit tokens so that the  model doesn't generate overly long prompts
    max_tokens: 3000,
    temperature: 0.9,
    // top_p: 1,
    // frequency_penalty: 1,
    // presence_penalty: 1,
    stream: true,

    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        //System content is the primary context given to the ai model and should be used to give high level context to the ai
        role: 'system',
        content: `Generate a multiple-choice question quiz tailored to the user's industry and job title. Ensure the questions align with the specified difficulty level.
        Include at most 2 questions from previously incorrect questions, avoiding reuse.
        Return the output in a JSON array of objects with keys like:  [{question: "question", options: ["option1","option2","option3","option4"], answer: "option1", explanation: "explanation1"},
        {question: "question", options: ["option1","option2","option3","option4"], answer: "option3", explanation: "explanation2"},...]`,
      },
      {
        //User context is the secondary content that presents the query and prompt
        role: 'user',
        content: `{industry: "Software Development", jobTitle: "DevOps", numberOfQuestions: 3, difficulty: 9}`,
      },
      {
        role: 'assistant',
        content: `[
            {
              "question": "Which of these is NOT an advantage of using microservices architecture?",
              "options": [
                "Independent deployment",
                "Fault isolation",
                "Easy to understand and modify for developers",
                "Tightly coupled service dependencies"
              ],
              "answer": "Tightly coupled service dependencies",
              "explanation": "Microservices architectures enhance independent deployment and fault isolation, and they are easy to understand and modify for developers. However, they don't promote tightly coupled service dependencies; instead, they advocate for loosely coupled services."
            },
            {
              "question": "Which DevOps practice is characterized by managing infrastructures through code thus applying versioning to system configurations in a manner similar to application code?",
              "options": [
                "Continuous Integration",
                "Infrastructure as Code",
                "Continuous Deployment",
                "Microservices Architecture"
              ],
              "answer": "Infrastructure as Code",
              "explanation": "Infrastructure as Code (IAC) is a DevOps practice that involves managing and provisioning computing infrastructure with machine-readable definition files, rather than physical hardware configuration or interactive configuration tools."
            },
            {
              "question": "In Kubernetes, what does POD stand for?",
              "options": [
                "Point of Delivery",
                "Point of Deployment",
                "It doesn't stand for anything",
                "Provisioned Operational Dependency"
              ],
              "answer": "It doesn't stand for anything",
              "explanation": "POD in Kubernetes does not stand for anything. A pod is the smallest and simplest unit in the Kubernetes object model that you create or deploy."
            }
          ]`,
      },
      {
        //User context is the secondary content that presents the query and prompt
        role: 'user',
        content: `{jobTitle:${field}, industry:${industry}, numberOfQuestions: ${numberOfQuestions}, difficulty : ${difficulty}}`,
      },
    ],
  })
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
