import ls from 'local-storage';
import {User} from "./User";
import React from "react";

export class LocalStorage {
    constructor() {
        if (ls('curUser') === null)
            ls('curUser', undefined);
        if (ls('signed') === null)
            ls('signed', false);
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

    clear() {
        ls('curUser', undefined);
        ls('signed', false);
    }

    isSigned() {
        return ls('signed');
    }
}
