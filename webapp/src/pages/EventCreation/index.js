import React from 'react';
import '../../webapp.css';
import {withRouter} from "react-router-dom"

class EventCreation extends React.Component {
  
	render() {
		return (
      <div className="container" id="container">
        <h1>Event Creation</h1>
      </div>
		);
	}
}

export default withRouter(EventCreation);