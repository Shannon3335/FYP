import { OpenAIStream, StreamingTextResponse } from 'ai'
import { openai } from '../../completionv2/route'

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
        content: `You are a multiple choice question quiz generator. You will be given the industry and job title of the user to generate questions for along with a list of concepts. 
        Choose topics randomly from the list of concepts and create a quiz of 3 questions.
        The output must follow the format specified by the delimiters below:
        [{"question": "question", "options": ["option1","option2","option3","option4"], "answer": "option1", "explanation": "explanation1"},
        {"question": "question", "options": ["option1","option2","option3","option4"], answer: "option3", explanation: "explanation2"},...]
        `,
      },
      { role: 'user', content: '["DevOps", "CI/CD", "Linux commands", "git", "Docker", "Kubernetes", "Jenkins"]' },
      {
        role: 'assistant',
        content: `[{"question": "What is the purpose of CI/CD in DevOps?", 
        "options": ["Automating the process of integrating code changes regularly and deploying them to production","Managing infrastructure as code","Tracking changes in code using version control system","Testing code performance"],
        "answer": "Automating the process of integrating code changes regularly and deploying them to production",
        "explanation": "CI/CD stands for Continuous Integration/Continuous Deployment, which involves automating the process of integrating code changes regularly and deploying them to production."},
        {"question": "Which command is used in Linux to display the current directory?", "options": ["pwd","ls","cd","mkdir"], "answer": "pwd", "explanation": " "pwd" stands for 'print working directory' and is used in Linux to display the current directory."},
        {"question": "What is the purpose of Docker in DevOps?", "options": ["Isolating and running applications in containers","Managing configuration files","Automating server provisioning","Version control system for code"],
        "answer": "Isolating and running applications in containers", "explanation": "Docker is used in DevOps for isolating and running applications in containers, allowing for consistency in development and deployment environments."}]`,
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
