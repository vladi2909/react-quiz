import axios from '../../axios/axios-quiz';
import { FETCH_QUIZ_START, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_ERROR } from './actionTypes'; 

export function fetchQuiz() {
    return async dispatch => {
        dispatch(fetchQuizStart())
        try {
            const response = await axios.get('/quiz.json');
            const quiz = [];
            Object.keys(response.data).forEach((key, index) => {
                quiz.push({
                    id: key,
                    name: `Test ${index + 1}`
                })
            })
            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizError(e))
        }
    }
}

export function fetchQuizStart() {
    return {
        type: FETCH_QUIZ_START
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizError(e) {
    return {
        type: FETCH_QUIZ_ERROR,
        error: e
    }
}