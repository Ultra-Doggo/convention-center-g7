import React from 'react';
import '../../webapp.css';
import { withRouter } from "react-router-dom"
import {registerToEvent} from "../../services/Validator";
import Navbar from '../../components/Navbar';

class FindEvents extends React.Component {

	constructor(props) {
		super(props);
		this.handleBackToDashboard = this.handleBackToDashboard.bind(this);
		this.props.storage.ClearAdminEventList();
		this.props.storage.SearchForEvents();

		let listEvents = this.props.storage.GetAdminEventList();

		this.state = {
			events: []
		}

		for (var i = 0; i < listEvents.length; i++) {
			let date = new Date(listEvents[i].date);
			this.state.events.push({
				name: listEvents[i].name,
				description: listEvents[i].description,
				location: listEvents[i].location,
				date_time: date.toLocaleString("en-US", { timeZone: "EST" }),
				url: listEvents[i].url,
				key: listEvents[i].key,
				admin: listEvents[i].admin
			})
		}
		console.log(listEvents);
	}

	handleBackToDashboard(event) {
		event.preventDefault();
		// this.props.storage.clear();
		this.props.history.push("/dashboard");
	}


	handlePopUpInfo(i) {
		console.log(i);
		let name = "new-container";
		document.getElementById(i).style.display="flex";
		document.getElementById("all-events").style.overflow="hidden";

	}

	closePopUpInfo(i) {
		console.log(i);
		document.getElementById(i).style.display="none";
		let name = "new-container";
		document.getElementById("all-events").style.overflow="scroll";

	}

	handleRegister(name, key) {
		let registered = registerToEvent(key, this.props.storage.getUser().email);
		if (registered[0]) {
			alert(`Successfully registered to event ${name}`);
		} else {
				alert(registered[1]);
		}
	}

	renderTableData() {

		const divStyle = {
			backgroundColor: "lightgrey", alignItems: "flex", width: 900,
			height: 50, margin: 20, padding: 0, overflow: "hidden",
			border: "1.5px solid red"
		}

		const dStyle = {
			display: "inline-block", float: "left",
			width: 299, height: 30, verticalAlign: "middle", marginTop: 13,
			//border: "1px solid red",
			textAlign: "center"

		}

		return this.state.events.map((eventInfo, index) => {
			const { key, name, description, location, date_time, url, admin } = eventInfo //destructuring
			return (

				<div>
					<div class="pop-up" id={name+index} >
						<div class="pop-up-content" >
						<div class="close" onClick={(e) => this.closePopUpInfo(name+index)}>+</div>
							<h1>{name}</h1>
							<p>Description: {description}</p>
							<p>Date: {date_time}</p>
							<p>Location: {location}</p>
							<p>URL: {url}</p>
							<button onClick={(e) => this.handleRegister(name, key)}> Register to this event</button>
						</div>
					</div>
					<div class='eventsBox' id={name} key={index} onClick={(e) => this.handlePopUpInfo(name+index)}>
						<div style={dStyle}>{name}</div>
						<div style={dStyle}>{location}</div>
						<div style={dStyle}>{date_time}</div>
					</div >

				</div>
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

			<div className="container-wrapper">
				<div className="container" id="all-events">
					<Navbar />
					<h1>Find Events </h1>
					<div className="table">
						<div>
							{this.renderTableData()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(FindEvents);
