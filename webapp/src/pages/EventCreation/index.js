import React from 'react';
import '../../webapp.css';
import {withRouter} from "react-router-dom"

class EventCreation extends React.Component {

  constructor(props) {
		super(props);

		this.state = {name: '', description:'', url:'', date:'', location:'', error:'registerError'};

		this.changeName = this.changeName.bind(this);
		this.changeDescription = this.changeDescription.bind(this);
		this.changeUrl = this.changeUrl.bind(this);
		this.changeDate = this.changeDate.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.handleBackToDashboard = this.handleBackToDashboard.bind(this);
	}

  changeName(event) {
			this.setState({name: event.target.value});
	}

	changeDescription(event) {
			this.setState({description: event.target.value});
	}

	changeUrl(event) {
			this.setState({url: event.target.value});
	}

  changeDate(event) {
			this.setState({date: event.target.value});
	}

  changeLocation(event) {
			this.setState({location: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		let created = this.props.storage.addEvent(this.state);
		if (created[0]) {
      alert(`event successfully ${this.state.name} created`);
			this.props.history.push('/dashboard');
		} else {
			this.setState({error: 'EventError'});
			this.setState({errorMessage: created[1]});
		}
	}

	handleBackToDashboard(event) {
		event.preventDefault();
        // this.props.storage.clear();
        this.props.history.push("/dashboard");
	}

	render() {
		return (
      <div className="container-wrapper">
        <div className="container" id="container">
          <h1>Event Creation</h1>
          <form onSubmit={this.handleSubmit}>
            <input type='text' required placeholder='Event Name'
                   value ={this.state.name} onChange={this.changeName}/>
            <input type='text' required placeholder='Description'
                   value={this.state.description} onChange={this.changeDescription}/>
            <input type='text' required placeholder='Event URL'
                   value ={this.state.url} onChange={this.changeUrl}/>
            <input type='datetime-local' required placeholder='Date'
                   value ={this.state.date} onChange={this.changeDate}/>
            <input type='text' required placeholder='Location/Address'
                   value ={this.state.location} onChange={this.changeLocation}/>
            <button>Create Event</button>
  		  <br></br>
  		  <button id="back-to-dash" onClick={this.handleBackToDashboard}> Cancel </button>
            <div className='error' id={this.state.error}>
                      {this.state.errorMessage}
            </div>
          </form>
        </div>
      </div>
		);
	}
}

export default withRouter(EventCreation);
