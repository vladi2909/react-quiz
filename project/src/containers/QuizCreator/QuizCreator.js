import React, { Component } from 'react';
import classes from './QuizCreator.module.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

class QuizCreator extends Component {

    state = {
        quiz: [],
        question: '',
        rightAnswer: '',
        id: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        formValid: true
    };

    // createFormControls() {
    //     return {
    //         question: '',
    //         option1: '',
    //         option2: '',
    //         option3: '',
    //         option4: '',
    //         selected: '',
    //         rightAnswer: '',
    //         formErrors: { email: '', password: '' },
    //         formValid: true
    //     }
    // }

    submitHandler = event => {
        event.preventDefault();
    }

    addQuestionHandler = event => {
        event.preventDefault();
        const quiz = [...this.state.quiz];
        const index = quiz.length + 1;
        const { question, option1, option2, option3, option4, rightAnswer } = this.state;

        const questionItem = {
            question: question,
            id: index,
            rightAnswer: rightAnswer,
            answers: [
                { text: option1 },
                { text: option2 },
                { text: option3 },
                { text: option4 }
            ]
        };

        quiz.push(questionItem);
        this.setState({
            quiz,
            question: '',
            rightAnswer: '',
            id: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            formValid: true
        });
    }

    createTestHandler = (event) => {
        event.preventDefault();
        console.log(this.state.quiz);
    }

    inputChangeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Create test</h1>
                    <form onSubmit={this.submitHandler}>
                        <TextField
                            className={classes.QuizInput}
                            label="Enter question"
                            variant="outlined"
                            size="small"
                            name="question"
                            value={this.state.question}
                            onChange={this.inputChangeHandler} />
                        <TextField
                            className={classes.QuizInput}
                            label="option 1"
                            variant="outlined"
                            size="small"
                            name="option1"
                            value={this.state.option1}
                            onChange={this.inputChangeHandler} />
                        <TextField
                            className={classes.QuizInput}
                            label="option 2"
                            variant="outlined"
                            size="small"
                            name="option2"
                            value={this.state.option2}
                            onChange={this.inputChangeHandler} />
                        <TextField
                            className={classes.QuizInput}
                            label="option 3"
                            variant="outlined"
                            size="small"
                            name="option3"
                            value={this.state.option3}
                            onChange={this.inputChangeHandler} />
                        <TextField
                            className={classes.QuizInput}
                            label="option 4"
                            variant="outlined"
                            size="small"
                            name="option4"
                            value={this.state.option4}
                            onChange={this.inputChangeHandler} />

                        <FormControl variant="outlined" size="small" className={classes.FormControl}>
                            <InputLabel htmlFor="age-native-simple">correct option</InputLabel>

                            <Select
                                native
                                value={this.state.rightAnswer}
                                onChange={this.inputChangeHandler}
                                label="correct option"
                                inputProps={{
                                    name: 'rightAnswer',
                                    id: 'age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={1}>option 1</option>
                                <option value={2}>option 2</option>
                                <option value={3}>option 3</option>
                                <option value={4}>option 4</option>
                            </Select>
                        </FormControl>

                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={this.addQuestionHandler}>
                            Add question
                        </Button>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={this.createTestHandler}
                            disabled={this.state.quiz.length === 0}
                        >
                            Add test
                        </Button>
                    </form>
                </div>

            </div>
        );
    }
}

export default QuizCreator;