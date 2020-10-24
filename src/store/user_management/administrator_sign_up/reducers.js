
import {
    SIGN_UP_SUCCESSFUL,
    REGISTERED_ADMINISTRATOR_FETCHED_SUCCESSFULLY,
    SIGN_UP_FAILED, SET_ADMINISTRATOR
} from "./actionTypes";
import {SET_PERCENTAGE} from "../../modules/objectives/actionTypes";

export const ACTION_HANDLERS = {

    [SIGN_UP_SUCCESSFUL]: state =>
        Object.assign({}, state, {
            signUpSuccessful: true
        }),
    [SIGN_UP_FAILED]: state =>
        Object.assign({}, state, {
            signUpSuccessful: false
        }),
    [REGISTERED_ADMINISTRATOR_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            registeredAdministrator: action.payload.registeredAdministrator
        }),
    [SET_ADMINISTRATOR]: (state, action) =>
        Object.assign({}, state, {
            administratorSelect: action.payload.administratorSelect
        }),


};
