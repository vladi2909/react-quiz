import React, { Component } from 'react';
import classes from './Auth.module.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormErrors from './FormErrors/FormErrors';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';
 
class Auth extends Component {

    state = {
        email: '',
        password: '',
        formErrors: { email: '', password: '' },
        emailValid: false,
        passwordValid: false,
        formValid: false
    };

    userInputHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.emailValid &&
                this.state.passwordValid
        });
    }


    loginHandler = () => {
        this.props.auth(
            this.state.email,
            this.state.password,
            true
        );
    }

    registerHandler = () => {
        this.props.auth(
            this.state.email,
            this.state.password,
            false
        )
    }

    submitHandler = event => {
        event.preventDefault();
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>
                    <FormErrors formErrors={this.state.formErrors} />
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        <div className={classes.InputWrap}>

                            <TextField
                                name="email"
                                label="Email"
                                variant="outlined"
                                size="small"
                                value={this.state.email}
                                onChange={this.userInputHandler} />
                            <TextField
                                style={{marginTop: '20px'}}
                                name="password"
                                label="Password"
                                variant="outlined"
                                size="small"
                                value={this.state.password}
                                onChange={this.userInputHandler} />
                        </div>
                        <div className={classes.ButtonWrap}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={this.loginHandler}
                                disabled={!this.state.formValid}>
                                Log in
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={this.registerHandler}
                                disabled={!this.state.formValid}>
                                Sign up
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);