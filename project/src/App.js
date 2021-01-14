import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';

import { Route, Redirect, withRouter } from 'react-router-dom';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Paper, Switch } from '@material-ui/core';

import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';
import { autoLogin } from './store/actions/auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: true,
      setDarkMode: true
    };
  }

  componentDidMount() {
    this.props.autoLogin();
  }

  render() {

    const theme = createMuiTheme({
      palette: {
        type: this.state.darkMode ? 'dark' : 'light'
      }
    });

    let routes = (
      <div>
        <Route path="/" component={QuizList} exact />
        <Route path="/auth" component={Auth} exact />
        <Route path="/quiz/:id" component={Quiz} exact />
        <Redirect to="/" />
      </div>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <div>
          <Route path="/quiz-creator" component={QuizCreator} exact />
          <Route path="/quiz/:id" component={Quiz} exact />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={QuizList} exact />
          <Redirect to="/" />
        </div>
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <Paper>
          <Layout>
            <div style={{ position: 'absolute', right: '40px', top: '35px' }}>
              <Switch
                checked={this.state.darkMode}
                onChange={() => this.setState({ darkMode: !this.state.darkMode })} />
            </div>
            {routes}
          </Layout>
        </Paper>
      </ThemeProvider>
    );

  }

}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));