import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req) {
    const {prompt} = await req.json();

    //print the value of the prompt object to see what the value it will give is
    console.log(prompt)
    // Ask OpenAI for a streaming completion given the prompt
    const response = await openai.completions.create({
        model: 'text-davinci-003',
        stream: true,
        temperature: 0.6,
        max_tokens: 400,
        prompt: `Job Title: ${prompt}
        Role Description: Generate 10 multiple-choice questions for a ${prompt} interview.
        Each question should have four options (a, b, c, d) with one correct answer.
        Ensure that the questions cover a range of technical topics relevant to the role of a ${prompt}.
Please format the questions and answer choices in the following way:
[Q1.Question]
a.[Option a]
b.[Option b]
c.[Option c]
d.[Option d]
Answer:[Correct Option]

[Q2.Question]
a.[Option a]
b.[Option b]
c.[Option c]
d.[Option d]
Answer:[Correct Option]
...
Note: Ensure that the questions align with the technical skills and knowledge relevant to ${prompt}
`,
    });
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
}