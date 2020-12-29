import React from 'react';
import classes from './ActiveQuiz.module.scss';

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p>
            <span>1.</span>&nbsp;
            how are you ?
        </p>

        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
        <small>4 from 10</small>
    </div>
)

export default ActiveQuiz;