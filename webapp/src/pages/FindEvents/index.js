import React from 'react';
import '../../webapp.css';
import {withRouter} from "react-router-dom"

class FindEvents extends React.Component {

	render() {
		return (
      <div className="container" id="container">
        <h1>Find Events</h1>
      </div>
		);
	}
}

export default withRouter(FindEvents);