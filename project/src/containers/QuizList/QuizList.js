import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './QuizList.module.scss';
import Loader from '../../components/ui/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuiz } from '../../store/actions/quiz';

class QuizList extends Component {

    renderQuizes() {
        return this.props.quiz.map(quiz => {
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

    componentDidMount() {
        this.props.fetchQuiz();
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>List of tests</h1>
                    {
                        this.props.loading && this.props.quiz.length !== 0
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

function mapStateToProps(state) {
    return {
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuiz: () => dispatch(fetchQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);