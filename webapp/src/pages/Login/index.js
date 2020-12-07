import React from 'react';
import '../../webapp.css';
import {withRouter} from "react-router-dom";
import {authenticate} from "../../services/Validator";

export class LoginBox extends React.Component {
    render() {
        return (
            <Login history = {this.props.history} storage = {this.props.storage}/>
        );
    }
}

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user:'', pass:'', error:'loginError'};

        this.props.storage.clear();
        this.changeUser = this.changeUser.bind(this);
        this.changePass = this.changePass.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeUser(event) {
        this.setState({user: event.target.value});
    }

    changePass(event) {
        this.setState({pass: event.target.value});
    }

    handleRegister(event) {
        event.preventDefault();
        this.props.history.push('/register');
    }

    handleSubmit(event) {
        event.preventDefault();
        let validated = authenticate(this.state, this.props.storage);
        if (validated[0]) {
          if (validated[1] === "superadmin") {
            this.props.history.push('/superadminsearch')
          }
          else {
    			   this.props.history.push('/dashboard');
          }
    		} else {
            this.setState({error: 'loginError'});
            this.setState({errorMessage: validated[1]});
        }
    }

    render () {
        return (
            <div className="container-wrapper">
              <div className="container" id="container">
                <div className="form-container">
                  <form onSubmit={this.handleSubmit}>
                    <h1>Sign in</h1>
                    <input type='text' required placeholder='Email'
                          value={this.state.user} onChange={ this.changeUser} />
                    <input type='password'required placeholder='Password'
                          value ={this.state.pass} onChange={this.changePass} />
                    <a href="#">Forgot your password?</a>
                    <button>Sign In</button>
                    <div className='error' id={this.state.error}>
                              {this.state.errorMessage}
                    </div>
                  </form>
                </div>
                <div className="overlay-container-right">
                  <h1>Hi There!</h1>
                  <p>Don't have an account with us yet? Register now!</p>
                  <button onClick={this.handleRegister} className="ghost" id="signUp">Sign Up </button>
                </div>
              </div>
            </div>
        );
    }
}

export default withRouter(LoginBox);
