
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';

import { Route } from 'react-router-dom';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useState } from 'react';
import { Paper, Switch } from '@material-ui/core';

function App() {

  const [darkMode, setDarkMode] = useState(true);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Layout>
          <div style={{position: 'absolute', right: '40px', top: '35px'}}>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}/>
          </div>
          <div>
            <Route path="/" component={QuizList} exact />
            <Route path="/auth" component={Auth} exact />
            <Route path="/quiz-creator" component={QuizCreator} exact />
            <Route path="/quiz/:id" component={Quiz} exact />
          </div>
        </Layout>
      </Paper>
    </ThemeProvider>
  );
}

export default App;