import ls from 'local-storage';
import {User} from "./User";
import React from "react";
import {addEvent} from "./Validator";

export class LocalStorage {
    constructor() {
        if (ls('curUser') === null)
            ls('curUser', undefined);
        if (ls('eventList') === null)
            ls('eventList', []);
        if (ls('signed') === null)
            ls('signed', false);
        if (ls('userType') === null)
            ls('userType', undefined);
    }

    setUser(newUser) {
        if (newUser instanceof User) {
            ls('curUser', newUser);
            ls('signed', true);
            return true;
        } else {
            return false;
        }
    }

    getUser() {
        return ls('curUser');
    }

    addEvent(state) {
        let eventList = ls('eventList');
        let added = addEvent(state, this.getUser().email);
        if (added[0]) {
            console.log(added[1]);
            eventList.push(added[1]);
            ls('eventList', eventList);
        }
        return added;
    }

    clear() {
        ls('curUser', undefined);
        ls('eventList', []);
        ls('signed', false);
    }

    isSigned() {
        return ls('signed');
    }
}
