import React from 'react';
import classes from './FinishedQuiz.module.scss';
import Button from '@material-ui/core/Button';

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
                                    ? <p>right: {quizItem.answers[quizItem.rightAnswerId - 1].text}</p>
                                    : null
                            }

                        </li>

                    );
                })
                }
            </ul>
            <p>Right {successCount} from {props.quiz.length}</p>
            {/* <div> */}
                <Button
                    onClick={props.onRepeat}
                    variant="contained"
                    color="primary"
                    size="small">
                    Repeate
                </Button>
                <Button
                    className={classes.Button}
                    variant="contained"
                    color="secondary"
                    size="small">
                    Return to tests
                </Button>
            {/* </div> */}
        </>
    );
}

export default FinishedQuiz;