//This func. takes in the AI completion and converts it into a quizObject
const ConvertToQuizObjects = (input) => {
  // console.log('input:' + input)
  const lines = input.split('\n') // Split input into individual lines
  //add another empty line at the end for processing
  lines.push('')
  // console.log('lines:' + lines)
  let quizArray = []
  const numberofLines = lines.length
  for (let i = 0; i <= numberofLines - 7; i += 7) {
    //each question is 7 lines including question,answer,options and blank line
    console.log('current q line' + lines[i])
    const qText = lines[i].trim('\t').substring(4) //  Trim and Extract the question text
    // console.log("qText:"+qText)
    const options = lines.slice(i + 1, i + 5).map((line) => line.trim().substring(3)) // Extract options
    // console.log("options:"+options)
    const answer = lines[i + 5].trim().substring(lines[i + 5].indexOf(':') + 5) // Extract and trim the answer
    // console.log("answer:"+answer)
    let quizObject = {
      question: qText,
      options: options,
      answer: answer,
    }
    // console.log(quizObject)
    quizArray.push(quizObject)
    // console.log('quizArray after pushing:', quizArray)
  }
  // console.log("array before returning:")
  // console.log(quizArray)
  // console.log('quizArray before returning:', quizArray)
  return quizArray
}
export default ConvertToQuizObjects
