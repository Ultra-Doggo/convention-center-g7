import React from 'react';
import '../../webapp.css';
import {withRouter} from "react-router-dom"

class ListEventsAdmin extends React.Component {

    constructor(props) {
        super(props);

        this.state = { adminEvents: this.props.storage.GetAdminEventList(),  itemList: []  } ;


        for (var i = 0; i < this.state.adminEvents.length; i++)
        {
        this.state.itemList.push( <ListEvents event = {this.state.adminEvents[i]} />) 
        }
        console.log(this.state.adminEvents)
    }


    render() {
        return (
    <div className="container" id="container">
        <h1> Events By Admin </h1>
        <ul> {this.state.itemList} </ul>
    </div>
        );
    }
}

class ListEvents extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <li > {this.props.event.name}  </li>
        )
    }

}

export default withRouter(ListEventsAdmin);