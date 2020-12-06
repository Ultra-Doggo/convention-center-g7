import React from 'react';
import '../../webapp.css';
import {withRouter} from "react-router-dom"

class FindEvents extends React.Component {

	constructor(props) {
		super(props);
		this.handleBackToDashboard = this.handleBackToDashboard.bind(this);
	}

	handleBackToDashboard(event) {
		event.preventDefault();
        // this.props.storage.clear();
        this.props.history.push("/dashboard");
	}

	render() {
		return (
      <div className="container" id="container">
        <h1>Find Events</h1>
		<button onClick={this.handleBackToDashboard}> Back to Dashboard </button>
      </div>
		);
	}
}

export default withRouter(FindEvents);