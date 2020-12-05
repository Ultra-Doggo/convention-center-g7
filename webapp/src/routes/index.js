import React from "react";
import { BrowserRouter, Switch} from "react-router-dom";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Route from './Route'
import EventCreation from '../pages/EventCreation';
import FindEvents from '../pages/FindEvents';
import {LocalStorage} from '../services/LocalStorage'

export default function Routes() {
    let storage = new LocalStorage();
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact
                   render = {(props) =><Login{...props} history = {Routes.history} storage = {storage}/>}
                   storage={storage}
            />
            <Route path="/register"
                   render = {(props) =><Register{...props} history = {Routes.history} storage = {storage}/>}
                   storage={storage}
            />
            <Route path="/dashboard"
                   render = {(props) =><Dashboard{...props} history = {Routes.history} storage = {storage}/>}
                   isPrivate = {true} storage={storage}
            />
            <Route path="/eventcreation"
                   render = {(props) =><EventCreation{...props} history = {Routes.history} storage = {storage}/>}
                   isPrivate = {true} storage={storage}
            />
            <Route path="/findevents"
                   render = {(props) =><FindEvents{...props} history = {Routes.history} storage = {storage}/>}
                   isPrivate = {true} storage={storage}
            />
            {/* redirect user to Login page if route does not exist and user is not authenticated */}
            <Route
                render = {(props) =><Login{...props} history = {Routes.history} storage = {storage}/>}
                storage={storage}
            />
            
        </Switch>
       </BrowserRouter>
    );
}
