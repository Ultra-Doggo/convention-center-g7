import React from 'react';
import '../../webapp.css';
import {withRouter} from "react-router-dom"
import {register} from "../../services/Validator";

class RegisterBox extends React.Component {

	constructor(props) {
		super(props);

		this.state = {name: '', user:'', pass:'', repass:'', error:'registerError'};

		this.changeName = this.changeName.bind(this);
		this.changeUser = this.changeUser.bind(this);
		this.changePass = this.changePass.bind(this);
		this.changeRepass = this.changeRepass.bind(this);
    	this.handleLogin = this.handleLogin.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	changeName(event) {
			this.setState({name: event.target.value});
	}

	changeUser(event) {
			this.setState({user: event.target.value});
	}

	changePass(event) {
			this.setState({pass: event.target.value});
	}

	changeRepass(event) {
			this.setState({repass: event.target.value});
	}

  handleLogin(event) {
      event.preventDefault();
      this.props.history.push('/login');
  }

	handleSubmit(event) {
		event.preventDefault();
		let registered = register(this.state, this.props.storage);
		if (registered[0]) {
			this.props.history.push('/dashboard');
		} else {
			this.setState({error: 'RegisterError'});
			this.setState({errorMessage: registered[1]});
		}
	}

	render() {
		return (
      <div className="container" id="container">
        <div className="form-container-right">
          <form onSubmit={this.handleSubmit}>
            <h1>Create Account</h1>
            <input type='text' required placeholder='Full Name'
                   value ={this.state.name} onChange={this.changeName}/>
            <input type='text' required placeholder='Email'
                   value={this.state.user} onChange={ this.changeUser}/>
            <input type='password' required placeholder='Password'
                   value ={this.state.pass} onChange={this.changePass}/>
            <input type='password' required placeholder='Re-Enter Password'
                   value ={this.state.repass} onChange={this.changeRepass}/>
            <button>Sign Up</button>
            <div className='error' id={this.state.error}>
                      {this.state.errorMessage}
            </div>
          </form>
        </div>
        <div className="overlay-container-left">
          <h1>Welcome Back!</h1>
          <p>Oh, already have an account with us? Sign in below!</p>
          <button onClick={this.handleLogin} className="ghost" id="signIn">Sign In</button>
        </div>
      </div>
		);
	}
}

export default withRouter(RegisterBox);
