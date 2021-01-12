import { FETCH_QUIZ_START, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_ERROR } from '../actions/actionTypes';

const initialState = {
    quiz: [],
    loading: false,
    error:null
}

export default function quizReducer(state = initialState, action) {

    switch(action.type) {
        case FETCH_QUIZ_START:
            return {
                ...state,
                loading: true
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz
            }
        case FETCH_QUIZ_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}