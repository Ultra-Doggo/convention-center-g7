import React from 'react';
import '../../webapp.css';
import Navbar from '../../components/Navbar';
import {Link, withRouter} from "react-router-dom"

class Dashboard extends React.Component {

	constructor(props) {
		super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleEventCreation = this.handleEventCreation.bind(this);
    this.handleFindEvents = this.handleFindEvents.bind(this);
	}

  handleLogout(event) {
        event.preventDefault();
        this.props.storage.clear();
        this.props.history.push("/");
  }

  handleEventCreation(event) {
    event.preventDefault();
    this.props.history.push("/eventcreation");
}

  handleFindEvents(event) {
    event.preventDefault();
    this.props.history.push("/findevents");
  }

	render() {
		return (
      <div className="container" id="container">
        <Navbar />
        <h1> Welcome, {this.props.storage.getUser().name}!</h1>
        <h3>Registered Events:</h3>
        <h3>My Events:</h3>
      </div>
      
		);
	}
}

export default withRouter(Dashboard);
