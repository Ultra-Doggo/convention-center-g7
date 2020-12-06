import React from 'react';
import '../../webapp.css';
import {withRouter} from "react-router-dom"

class FindEvents extends React.Component {

	constructor(props) {
		super(props);
		this.handleBackToDashboard = this.handleBackToDashboard.bind(this);

		this.state =  {
			events: [
				// event name, description, location, date & time, host email, website
				{ event: 'placeholder ONE', location: 'a place', date: 'a' , website: 'google.com'},
				{ event: 'placeholder TWO', location: 'that place', date: 'a' , website: 'youtube.com'},
				{ event: 'placeholder THREE', location: 'this place', date: 'a' , website: 'gmail.com'},
				{ event: 'placeholder FOUR', location: 'another place', date: 'a' , website: 'site.com'},
			]
		}
	}

	handleBackToDashboard(event) {
		event.preventDefault();
        // this.props.storage.clear();
        this.props.history.push("/dashboard");
	}

	renderTableData() {
		return this.state.events.map((eventInfo, index) => {
		   const { event, about, location, date, website, email } = eventInfo //destructuring
		   return (
			  <tr key={event}>
				 <td>{event}</td>
				 <td>{location}</td>
				 <td>{date}</td>
				 <td>{website}</td>
			  </tr>
		   )
		})
	}

	renderTableHeader() {
		let header = Object.keys(this.state.events[0])
		return header.map((key, index) => {
		   return <th key={index}>{key.toUpperCase()}</th>
		})
	 }

	render() {
		return (
      		<div className="container" id="container">
        		<h1>Find Events</h1>
				<table id='events'>
               		<tbody>
						<tr>{this.renderTableHeader()}</tr>
                  		{this.renderTableData()}
               		</tbody>
            	</table>
				<button id="back-to-dash" onClick={this.handleBackToDashboard}> Back to Dashboard </button>
      		</div>
		);
	}
}

export default withRouter(FindEvents);