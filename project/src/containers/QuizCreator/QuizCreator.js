import React, { Component } from 'react';
import classes from './QuizCreator.module.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create';

class QuizCreator extends Component {

    state = {
        question: '',
        rightAnswerId: '',
        id: '',
        option1: '',
        option2: '',
        option3: '',
        option4: ''
    };

    submitHandler = event => {
        event.preventDefault();
    }

    addQuestionHandler = event => {
        event.preventDefault();
        const { question, option1, option2, option3, option4, rightAnswerId } = this.state;

        const questionItem = {
            question: question,
            id: this.props.quiz.length + 1,
            rightAnswerId: rightAnswerId,
            answers: [
                { text: option1, id: '1' },
                { text: option2, id: '2' },
                { text: option3, id: '3' },
                { text: option4, id: '4' }
            ]
        };

        this.props.createQuizQuestion(questionItem);
        
        this.setState({
            question: '',
            rightAnswerId: '',
            id: '',
            option1: '',
            option2: '',
            option3: '',
            option4: ''
        });
    }

    createTestHandler = event => {
        event.preventDefault();
            this.setState({
                question: '',
                rightAnswerId: '',
                id: '',
                option1: '',
                option2: '',
                option3: '',
                option4: ''
            });
            this.props.finishCreateQuiz();
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
                                value={this.state.rightAnswerId}
                                onChange={this.inputChangeHandler}
                                label="correct option"
                                inputProps={{
                                    name: 'rightAnswerId',
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
                            disabled={this.props.quiz.length === 0}
                        >
                            Add test
                        </Button>
                    </form>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);