import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './QuizList.module.scss';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/ui/Loader/Loader';

class QuizList extends Component {

    state = {
        quiz: [],
        loading: true
    };

    renderQuizes() {
        return this.state.quiz.map(quiz => {
            return (
                <li
                    key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            );
        });
    }

    async componentDidMount() {
        try {
            const response = await axios.get('/quiz.json')
            const quiz = []
            Object.keys(response.data).forEach((key, index) => {
                quiz.push({
                    id: key,
                    name: `Test ${index + 1}`
                })
            })
            this.setState({ quiz, loading: false });
        } catch (e) {
            console.log(e);
        }

    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>List of tests</h1>

                    {
                        this.state.loading
                            ? <Loader />
                            : <ul>
                                {this.renderQuizes()}
                              </ul>
                    }
                </div>
            </div>
        );
    }
}

export default QuizList;