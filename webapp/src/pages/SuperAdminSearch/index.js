import React from 'react';
import '../../webapp.css';
import {withRouter} from "react-router-dom"

// this is the page where a superAdmin will search up a user by their email
// The super admin will then select either the events they listed or the events they signed up for
class SuperAdminSearch extends React.Component {

	constructor(props) {
		super(props);

    this.state = {email: '', error:'registerError'};
    this.props.storage.ClearAdminEventList();
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAdminEvents = this.handleAdminEvents.bind(this);
    this.handleUserEvents = this.handleUserEvents.bind(this);
    this.SearchName = this.SearchName.bind(this);
	}

  handleLogout(event) {
        event.preventDefault();
        this.props.storage.clear();
        this.props.history.push("/");
  }

  SearchName(event) {
    this.setState({email: event.target.value});
  }

  // need a "search for user" feature to look up and check for valid users who have made or signed up for events
  handleAdminEvents(event) {
    event.preventDefault();
		if (this.state.email !== '') {
	    let check = this.props.storage.SearchForAdmin(this.state);
	    console.log("super admin check = " + check);
	    if (check[0]) {
	      this.props.history.push("/ListEventsAdmin");
			} else {
				this.setState({error: 'EventError'});
				this.setState({errorMessage: check[1]});
			}
		} else {
				alert("Please input an email");
		}
  }

  handleUserEvents(event) {
    event.preventDefault();
		if (this.state.email !== '') {
	    let check = this.props.storage.SearchForUser(this.state);
	    if (check[0]) {
	      //this.props.history.push("/ListEventsUser");
	      alert("success");
			} else {
				this.setState({error: 'EventError'});
	      this.setState({errorMessage: check[1]});
	    }
		} else {
				alert("Please input an email");
		}
  }

	render() {
		return (
      <div className="container" id="container">
        <h1> Welcome, Super Admin {this.props.storage.getUser().name}!</h1>
        <div className="container" id="container">
          <h2> Search User </h2>
          <form>
            <input type='text' required placeholder='User Email' value ={this.state.email} onChange={this.SearchName}/>
          </form>
          <button onClick={this.handleAdminEvents} style={{marginLeft: '12rem'}} > Admin Events </button>
          <button onClick={this.handleUserEvents} style={{marginLeft: '1rem'}}> User Events </button>
          <br></br><br></br>
          <button onClick={this.handleLogout} style={{marginLeft: '20rem'}}> Logout </button>
        </div>
      </div>
		);
	}
}

export default withRouter(SuperAdminSearch);
