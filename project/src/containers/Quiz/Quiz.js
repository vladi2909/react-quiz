import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/ui/Loader/Loader';

class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true
    };

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            return;
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        const timeout = window.setTimeout(() => {
            if (this.isQuizFinished()) {
                this.setState({ isFinished: true });
            } else {
                this.setState({
                    activeQuestion: this.state.activeQuestion + 1,
                    answerState: null
                })
            }
            window.clearTimeout(timeout);
        }, 800);

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState({
                answerState: { [answerId]: 'success' },
                results
            });
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: { [answerId]: 'error' },
                results
            });
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    repeatHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`/quiz/${this.props.match.params.id}.json`);
            const quiz = response.data;
            this.setState({ quiz, loading: false })
        } catch (e) {
            console.log(e);
        }

    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    {
                        this.state.loading
                            ? <Loader />
                            : this.state.isFinished
                                ? <FinishedQuiz
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    onRepeat={this.repeatHandler}
                                  />
                                : <>
                                    <h1>Answer the questions</h1>
                                    <ActiveQuiz
                                        answers={this.state.quiz[this.state.activeQuestion].answers}
                                        question={this.state.quiz[this.state.activeQuestion].question}
                                        onAnswerClick={this.onAnswerClickHandler}
                                        quizLength={this.state.quiz.length}
                                        answerNumber={this.state.activeQuestion + 1}
                                        state={this.state.answerState}
                                    />
                                </>
                    }
                </div>
            </div>
        )
    }
}

export default Quiz;