import React from 'react';
import classes from './ActiveQuiz.module.scss';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p>
            <span>{props.answerNumber}.</span>&nbsp;
            {props.question}
        </p>
        <AnswersList 
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
        <small>{props.answerNumber} from {props.quizLength}</small>
    </div>
)

export default ActiveQuiz;