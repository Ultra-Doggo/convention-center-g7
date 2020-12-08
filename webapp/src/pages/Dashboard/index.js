import React from 'react';
import '../../webapp.css';
import Navbar from '../../components/Navbar';
import {Link, withRouter} from "react-router-dom";
import {registerToEvent, deleteEvent, approveEvent} from "../../services/Validator";

class Dashboard extends React.Component {

	constructor(props) {
		super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleEventCreation = this.handleEventCreation.bind(this);
    this.handleFindEvents = this.handleFindEvents.bind(this);

    this.props.storage.ClearAdminEventList();
    this.props.storage.SearchForAdmin(this.props.storage.getUser());
		let listEvents = this.props.storage.GetAdminEventList();

		this.state = {
			events: [],
			registeredEvents: []
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
				admin: listEvents[i].admin,
				approved: listEvents[i].approved
			})
    }

		this.props.storage.ClearAdminEventList();
		this.props.storage.SearchForUser(this.props.storage.getUser());
	  listEvents = this.props.storage.GetAdminEventList();

		for (var i = 0; i < listEvents.length; i++) {
			let date = new Date(listEvents[i].date);
			this.state.registeredEvents.push({
				name: listEvents[i].name,
				description: listEvents[i].description,
				location: listEvents[i].location,
				date_time: date.toLocaleString("en-US", { timeZone: "EST" }),
				url: listEvents[i].url,
				key: listEvents[i].key,
				admin: listEvents[i].admin
			})
    }
		console.log(this.state.events);
		console.log(this.state.registeredEvents);
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

	handleDelete(key, name) {
		if (window.confirm(`Are you sure you want to delete the event ${name}?`)) {
			let deleted = deleteEvent(key);
			if (deleted[0]) {
				alert("Event was successfully deleted.");
				window.location.reload();
			} else {
					alert(deleted[1]);
			}
		} else {
				alert("Deletion of event cancelled.");
		}
	}

	handleApprove(key, name, approved) {
		if (approved === "yes") {
			alert("Event is already approved");
			return;
		}
		if (window.confirm(`Are you sure you want to approve the event ${name}?`)) {
			let approved = approveEvent(key);
			if (approved[0]) {
				alert("Event was successfully approved.");
			} else {
					alert(approved[1]);
			}
		} else {
				alert("Approval of event cancelled.");
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
			width: 260, height: 30, verticalAlign: "middle", marginTop: 13,
			//border: "1px solid red",
			textAlign: "center"

		}

		return this.state.events.map((eventInfo, index) => {
			const { key, name, description, location, date_time, url, admin, approved } = eventInfo //destructuring
			return (

				<div>
					<div class='eventsBox' id={name} key={index}>
						<div id="approveButton" onClick={(e) => this.handleApprove(key, name, approved)}>+</div>
						<div style={dStyle}>{name}</div>
						<div style={dStyle}>{location}</div>
						<div style={dStyle}>{date_time}</div>
					  <div id="deleteButton" onClick={(e) => this.handleDelete(key, name)}>x</div>
					</div >

				</div>
			)
		})
	}

	renderRegEventsTableData() {

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

		return this.state.registeredEvents.map((eventInfo, index) => {
			const { key, name, description, location, date_time, url, admin } = eventInfo //destructuring
			return (

				<div>
					<div class='eventsBox' id={name} key={index}>
						<div style={dStyle}>{name}</div>
						<div style={dStyle}>{location}</div>
						<div style={dStyle}>{date_time}</div>
					</div >

				</div>
			)
		})
	}

	render() {
		return (
				<div className="new-container">
	        <Navbar />
	        <h1> Welcome, {this.props.storage.getUser().name}!</h1>
					<div>
		        <h3>My Events:</h3>
	          <div className="table" id="host-events-table">
							<div>
								{this.renderTableData()}
							</div>
						</div>
					</div>
					<div>
						<h3>Registered Events:</h3>
						<div className="table" id="host-events-table">
							<div>
								{this.renderRegEventsTableData()}
							</div>
						</div>
					</div>
	      </div>
		);
	}
}

export default withRouter(Dashboard);
