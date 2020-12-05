import React from 'react';
import '../../webapp.css';
import {withRouter} from "react-router-dom"

class Dashboard extends React.Component {

	constructor(props) {
		super(props);

    this.handleLogout = this.handleLogout.bind(this);
	}

  handleLogout(event) {
        event.preventDefault();
        this.props.storage.clear();
        this.props.history.push("/");
  }

	render() {
		return (
      <div className="container" id="container">
        <button onClick={this.handleLogout}> Logout </button>
        <h1> Welcome {this.props.storage.getUser().name} </h1>
      </div>
		);
	}
}

export default withRouter(Dashboard);
