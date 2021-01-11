import axios from 'axios';

export default axios.create({
   baseURL: 'https://react-quiz-37c4f-default-rtdb.firebaseio.com/'
})