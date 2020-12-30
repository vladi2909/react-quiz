import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 0,
                question: 'how are you?',
                rightAnswerId: 2,
                answers: [
                    { text: 'I am fine', id: 1 },
                    { text: 'ok', id: 2 },
                    { text: 'normal, thanks', id: 3 }
                ]
            },
            {
                id: 1,
                question: 'where are you from ?',
                rightAnswerId: 1,
                answers: [
                    { text: 'canada', id: 1 },
                    { text: 'usa', id: 2 },
                    { text: 'poland', id: 3 }
                ]
            }
        ]
    };

    onAnswerClickHandler = answerId => {
        const question = this.state.quiz[this.state.activeQuestion];

        const timeout = window.setTimeout(() => {
            if (this.isQuizFinished()) {
                console.log('finished');
            } else {
                this.setState({
                    activeQuestion: this.state.activeQuestion + 1,
                    answerState: null
                })
            }

            window.clearTimeout(timeout);
        }, 800);

        if (question.rightAnswerId === answerId) {
            this.setState({
                answerState: { [answerId]: 'success' }
            });
        } else {
            this.setState({
                answerState: { [answerId]: 'error' }
            });
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer the questions</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz;