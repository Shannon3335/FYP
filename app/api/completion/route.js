import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req) {
    const prompt = await req.json();

    // Ask OpenAI for a streaming completion given the prompt
    const response = await openai.completions.create({
        model: 'text-davinci-003',
        stream: true,
        temperature: 0.6,
        max_tokens: 300,
        prompt: `Job Title: ${prompt}
        Role Description: ${prompt}
Prompt: Generate 10 multiple choice questons that an interviewr might ask you based on the technical requirements of the ${prompt} role.
Please format the questions and answer choices in the following way:
[Question 1]
a.[Option a]
b.[Option b]
c.[Option c]
d.[Option d]
Answer:[Correct Option]

[Question 2]
a.[Option a]
b.[Option b]
c.[Option c]
d.[Option d]
Answer:[Correct Option]
...
Note: Ensure that the questions align with the technical skills and knowledge relevant to the ${prompt}
`,
    });
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
}