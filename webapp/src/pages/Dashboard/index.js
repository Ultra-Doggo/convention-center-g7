import React from 'react';
import '../../webapp.css';
import Navbar from '../../components/Navbar';
import {Link, withRouter} from "react-router-dom";
import {registerToEvent} from "../../services/Validator";

class Dashboard extends React.Component {

	constructor(props) {
		super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleEventCreation = this.handleEventCreation.bind(this);
    this.handleFindEvents = this.handleFindEvents.bind(this);

    this.props.storage.ClearAdminEventList();
    console.log(this.props.storage.getUser().email);
    this.props.storage.SearchForAdmin(this.props.storage.getUser());
    // this.props.storage.SearchForEvents();

    
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
    
    console.log(this.state.events);
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
					<div class='eventsBox' id={name} key={index}>
						<div style={dStyle}>{name}</div>
						<div style={dStyle}>Filler Location{location}</div>
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
	        <h3>Registered Events:</h3>
	        <h3>My Events:</h3>
          <div className="table" id="host-events-table">
						<div>
							{this.renderTableData()}
						</div>
					</div>
	      </div>
		);
	}
}

export default withRouter(Dashboard);
