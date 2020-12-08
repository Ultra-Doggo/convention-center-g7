import {User} from "./User";
import {Event} from "./Event";
import config from "../config";

function callAuthenticate(state) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", `${config.baseUrl}/login`, false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("email="+state.user+"&password="+state.pass);
  return [xhr.status, xhr.responseText];
}

function callRegister(state) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", `${config.baseUrl}/register`, false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("name="+state.name+"&email="+state.user+"&password="+state.pass);
  return xhr.status;
}

function callCreateEvent(state, admin_email) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", `${config.baseUrl}/create-event`, false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("name="+state.name+"&email="+admin_email+"&description="+state.description+"&url="+state.url+"&date_time="+state.date);
  return xhr.status;
}

function callDeleteEvent(event_id) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", `${config.baseUrl}/delete-event`, false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("event_id="+event_id);
  return xhr.status;
}

function callRegisterEvent(event_id, curUser) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", `${config.baseUrl}/add-person`, false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("event_id="+event_id+"&email="+curUser);
  return xhr.status;
}

function CallSearchForUser(state) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", `${config.baseUrl}/get-events-person`, false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("email="+state.email);
  return [xhr.status, xhr.responseText];
}

function CallSearchForAdmin(state) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", `${config.baseUrl}/get-events-admin`, false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("email="+state.email);
  return [xhr.status, xhr.responseText];
}

function GetAllEventsAuth() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", `${config.baseUrl}/get-all-events`, false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send();
  console.log(xhr.responseText);
  return [xhr.status, xhr.responseText];
}

export function authenticate(state, storage) {
    if (state.user !== "" && state.pass !== "") {
        let authCode = callAuthenticate(state);
        if (authCode[0] !== 200) {
          if (authCode[0] === 204 || authCode[0] === 205) {
            return [false, 'Invalid email or password']
          } else {
            return [false, 'Error has occured']
          }
        }
        let data = JSON.parse(authCode[1]);
        if (authCode[0] === 200) {
          let newUser = new User(state.user, data.results.name, data.results.level);
          storage.setUser(newUser);
          return [true, data.results.level];
        }
    } else {
        return [false, 'Please fill in all fields'];
    }
}

export function register(state, storage) {
    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/;
    let passFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    if (state.pass !== state.repass) {
      return [false, 'Passwords do not match']
    } else if (!state.user.match(emailFormat)) {
        return [false, `${state.user} is not a valid email address`]
    } else if (!state.pass.match(passFormat)){
        return [false, 'Passwords must be at least 8 characters long; contain at least 1 lower case letter [a-z]; at least 1 upper case letter [A-Z]; at least 1 number [0-9]']
    } else if (state.name !== "" && state.user !== "" && state.pass !== "" && state.repass !== ""){
        let authCode = callAuthenticate(state);
        if (authCode[0] === 200 || authCode[0] === 204) {
          return [false, `An account already exists for ${state.name}`]
        } else if (authCode[0] === 205) {
            let registerCode = callRegister(state);
            if (registerCode === 200) {
              let newUser = new User(state.user, state.name, "person");
              storage.setUser(newUser);
              return [true];
            } else {
                  return [false, 'Error has occurred']
            }
        } else {
           return [false, 'Error has occurred']
        }
    } else {
        return [false, 'Please fill in all fields']
    }
}

export function addEvent(state, curUser) {
  let eventCode = callCreateEvent(state, curUser);
  if (eventCode === 200) { // event added successfully
    let newEvent = new Event('0', state.name, curUser, state.description, state.url, state.date, state.address);
    return [true, newEvent];
  } else {
      return [false, 'Error has occurred'];
  }
}

export function deleteEvent(event_id) {
  let deleteCode = callDeleteEvent(event_id);
  if (deleteCode === 200) {
    return [true];
  } else {
      return [false, "Error has occured"];
  }
}

export function registerToEvent(event_id, curUser) {
  let registerCode = callRegisterEvent(event_id, curUser);
  if (registerCode === 200) {
    return [true];
  } else if (registerCode === 305) {
      return [false, "User is already added to this event"];
  } else if (registerCode === 306) {
      return [false, "Admin cannot be added to own event"];
  } else {
      return [false, "Error has occured"];
  }
}

export function SearchForUser(state) {
  let eventCode = CallSearchForUser(state);
  if (eventCode[0] === 200) {
    let data = JSON.parse(eventCode[1]);
    let events = [];
    for (var i = 0; i < data.results.length; i++)
    {
      events.push(new Event(data.results[i].event_id, data.results[i].name, data.results[i].email, data.results[i].description,
        data.results[i].url, data.results[i].date_time, data.results[i].address));
    }
    return [true, events];
  } else {
      return [false, 'Error has occurred'];
  }
}

export function SearchForAdmin(state) {
  let eventCode = CallSearchForAdmin(state);
  if (eventCode[0] === 200) {
    let data = JSON.parse(eventCode[1]);
    let events = [];
    for (var i = 0; i < data.results.length; i++)
    {
      events.push(new Event(data.results[i].event_id, data.results[i].name, data.results[i].email, data.results[i].description,
        data.results[i].url, data.results[i].date_time, data.results[i].address));
    }
    return [true, events];
  } else {
      return [false, 'Error has occurred'];
  }
}

export function SearchAllEvents() {
  let eventCode = GetAllEventsAuth();
  console.log(eventCode);
  if (eventCode[0] === 200) {
    let data = JSON.parse(eventCode[1]);
    let events = [];
    for (var i = 0; i < data.results.length; i++)
    {
      events.push(new Event(data.results[i].event_id, data.results[i].name, data.results[i].email, data.results[i].description,
        data.results[i].url, data.results[i].date_time, data.results[i].address));
    }
    return [true, events];
  } else {
      return [false, 'Error has occurred'];
  }
}
