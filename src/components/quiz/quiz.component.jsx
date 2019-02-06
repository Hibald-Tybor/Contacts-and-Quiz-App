import React from 'react';

import './styles.scss';

const operators = ['-', '+', '*'];

class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: '',
            answers: [],
            correctAnswer: null,
            answered: false,
        }

        this.createQA = this.createQA.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    componentDidMount() {
        this.createQA();
    }

    // the coefficient and the min & max ensure that the wrong answers are similar to the correct one
    createRandomAnswers(correctAnswer, coefficient) {
        let answerArray = [];

        let randomizer = (Math.floor(Math.random() * 3));

        let min = Math.floor((correctAnswer - 10) * coefficient);
        let max = Math.floor((correctAnswer + 10) * coefficient);

        // this loop ensure that there are no repeating numbers in the array
        while (answerArray.length < 4) {
            let newNumber = Math.floor(Math.random() * (max - min)) + min;
            if (answerArray.indexOf(newNumber) === -1) {
                answerArray.push(newNumber);
            }
        }

        // if the correct answer is by chance present, it just returns the array, otherwise it splices the answer randomly
        if (answerArray.indexOf(correctAnswer) === -1) answerArray.splice(randomizer, 1, correctAnswer);
        return answerArray.sort((a, b) => a - b)
    }

    createQA() {

        // randomizer is used to select an operator
        let randomizer = (Math.floor(Math.random() * 3));
        let randomOperator = operators[randomizer];

        // numbers used in the math problem
        let randomNumber1 = (Math.floor(Math.random() * 20) + 1);
        let randomNumber2 = (Math.floor(Math.random() * 20) + 1);

        let evalString = `${randomNumber1} ${randomOperator} ${randomNumber2}`;
        let correctAnswer = eval(evalString);

        this.setState({
            answered: false,
            question: evalString,
            // storing the correct answer separately for later easier reference
            correctAnswer: correctAnswer,
            answers: this.createRandomAnswers(correctAnswer, 1.2)
        })
    }

    handleAnswer(answer) {
        if (answer === this.state.correctAnswer) {
            this.setState({
                answered: true,
                answeredCorrectly: true
            })
        } else {
            this.setState({
                answered: true,
                answeredCorrectly: false
            })
        }

    }

    renderButtons() {
        return this.state.answers.map((answer, i) => {
            return (
                <button onClick={() => this.handleAnswer(answer)} key={`button${i}`} className={`answer-button button-${i}`}>{answer}</button>
            )
        })
    }

    render() {
        return (
            <div className="quiz-container">
                {
                    this.state.answered
                        ?
                        <div className="answer-container">
                                <h2 className="quiz-header">Výsledek</h2>
                            <h3>{this.state.correctAnswer}</h3>
                            <p>{this.state.answeredCorrectly ? "Vaše odpověď byla správná! :)" : "Špatně. Zkus to znovu. :("}</p>
                            <button onClick={this.createQA} className={`next-button ${this.state.answeredCorrectly ? 'green-button' : 'red-button'}`}>Další otázka</button>
                        </div>
                        :
                        <div>
                            <h2 className="quiz-header">Kolik je {this.state.question}?</h2>
                            <div className="button-container">
                                {this.renderButtons()}
                            </div>
                        </div>
                }
            </div>

        )
    }
}

export default Quiz