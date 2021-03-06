import React from 'react';
import '../../webapp.css';
import {withRouter} from "react-router-dom"

class ListEventsAdmin extends React.Component {

	constructor(props) {
		super(props);
		this.handleBackToDashboard = this.handleBackToDashboard.bind(this);
		let listEvents = this.props.storage.GetAdminEventList();

		this.state =  {
			events: []
		}

		for (var i = 0; i < listEvents.length; i++) {
			let date = new Date(listEvents[i].date);
			this.state.events.push({
				name: listEvents[i].name,
        admin: listEvents[i].admin,
				description: listEvents[i].description,
				location: listEvents[i].location,
				date_time: date.toLocaleString("en-US", {timeZone: "EST"}),
				url: listEvents[i].url,
				key: listEvents[i].key,
			})
		}
	}

	handleBackToDashboard(event) {
		event.preventDefault();
        // this.props.storage.clear();
        this.props.history.push("/superadminsearch");
	}

	renderTableData() {
		return this.state.events.map((eventInfo, index) => {
		   const { key, name, admin, description, location, date_time, url, email } = eventInfo //destructuring
		   return (
				 <tr key={key}>
					 <td>{name}</td>
           <td>{admin}</td>
					 <td>{description}</td>
					 <td>{location}</td>
					 <td>{date_time}</td>
					 <td>{url}</td>
					 <td>{key}</td>
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
      		<div className="new-container">
						<div className="table">
						<h1>Events Created by Admin</h1>
							<table id='events'>
				        <tbody>
									<tr>{this.renderTableHeader()}</tr>
									{this.renderTableData()}
			         	</tbody>
			        </table>
							</div>
				<button id="back-to-dash" onClick={this.handleBackToDashboard}> Back to Admin Dashboard </button>
      		</div>
		);
	}
}

export default withRouter(ListEventsAdmin);
