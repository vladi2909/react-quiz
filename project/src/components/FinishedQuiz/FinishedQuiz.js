import React from 'react';
import classes from './FinishedQuiz.module.scss';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++;
        }

        return total;
    }, 0)

    return (
        <>
            <h1>Results</h1>
            <ul className={classes.FinishedQuiz}>
                <p className={classes.ResultsCount}>Right {successCount} from {props.quiz.length}</p>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ];

                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                            {
                                props.results[quizItem.id] === 'error'
                                    ? <>
                                        <p>right: {quizItem.answers[quizItem.rightAnswerId - 1].text}</p>
                                    </>
                                    : null
                            }

                        </li>

                    );
                })
                }
                <div style={{ marginTop: '30px' }}>
                    <Button
                        onClick={props.onRepeat}
                        variant="contained"
                        color="primary"
                        size="small">
                        Repeate
                    </Button>
                    <Link to='/' style={{textDecoration: 'none'}}>
                        <Button
                            className={classes.Button}
                            variant="contained"
                            color="secondary"
                            size="small">
                            Return to tests
                        </Button>
                    </Link>

                </div>

            </ul>
        </>
    );
}

export default FinishedQuiz;