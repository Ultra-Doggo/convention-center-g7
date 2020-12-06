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
              let newUser = new User(state.user, state.name);
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
    let newEvent = new Event(state.name, curUser, state.description, state.url, state.date, state.address);
    return [true, newEvent];
  } else {
      return [false, 'Error has occurred'];
  }
}
