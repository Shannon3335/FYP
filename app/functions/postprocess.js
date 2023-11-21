const convertToQuizObjects =(input)=> {
    const questions = input.split('\n\n') // Split input into individual questions
    console.log("QUESTION:"+questions)
    const quizArray = questions.map(question => {
        const lines = question.split('\n') // Split question into lines
        const numberofLines = lines.length
        let quizObject
        for(let i = numberofLines%5; i<lines.length; i++){
            const qText = lines[0].trim().substring(4) // Extract and trim the question text
            const options = lines.slice(1,5).map(line => line.trim().substring(3)) // Extract options
            console.log("options: "+options)
            const answer = lines[5].substring(lines[lines.length - 1].indexOf(':') + 4).trim() // Extract and trim the answer

            // Create the quiz object
            quizObject = {
                question: qText,
                option1: options[0],
                option2: options[1],
                option3: options[2],
                option4: options[3],
                answer: answer,
            };
        }
        return quizObject
    });
    return quizArray
}
export default convertToQuizObjects;

