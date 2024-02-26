class QuizLogicService {
  constructor(quizArray) {
    this.quizArray = quizArray
    this.isQuizOver = false
    this.activeQuestionNo = 0
    this.selectedOption = null
    this.selectedIndex = null
    this.isLastQuestion = false
    this.result = {
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    }
  }

  verifyAnswer() {
    if (this.selectedOption == this.quizArray[this.activeQuestionNo].answer) {
      console.log('correct answer')
      result = {
        ...this.result,
        score: this.result.score + 5,
        correctAnswers: this.correctAnswers + 1,
      }
    } else {
      console.log('incorrect answer')
      this.result = {
        ...this.result,
        wrongAnswers: this.result.wrongAnswers + 1,
      }
    }
  }

  getSelectedOption() {}

  setSelectedOption() {}

  nextQuestion() {}
}
