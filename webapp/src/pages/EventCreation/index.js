import React from 'react';
import '../../webapp.css';
import {withRouter} from "react-router-dom"

class EventCreation extends React.Component {

  constructor(props) {
		super(props);

		this.state = {name: '', description:'', url:'', date:'', address:'', error:'registerError'};

		this.changeName = this.changeName.bind(this);
		this.changeDescription = this.changeDescription.bind(this);
		this.changeUrl = this.changeUrl.bind(this);
		this.changeDate = this.changeDate.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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

  changeAddress(event) {
			this.setState({address: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		let created = this.props.storage.addEvent(this.state);
		if (created[0]) {
			alert("success");
		} else {
			this.setState({error: 'EventError'});
			this.setState({errorMessage: created[1]});
		}
	}

	render() {
		return (
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
          <input type='text' required placeholder='Address'
                 value ={this.state.address} onChange={this.changeAddress}/>
          <button>Create Event</button>
          <div className='error' id={this.state.error}>
                    {this.state.errorMessage}
          </div>
        </form>
      </div>
		);
	}
}

export default withRouter(EventCreation);