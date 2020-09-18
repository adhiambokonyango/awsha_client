
import {
    SIGN_UP_SUCCESSFUL,
    REGISTERED_USER_FETCHED_SUCCESSFULLY,
    SIGN_UP_FAILED, SET_USER
} from "./actionTypes";

export const ACTION_HANDLERS = {

    [SIGN_UP_SUCCESSFUL]: state =>
        Object.assign({}, state, {
            signUpSuccessful: true
        }),
    [SIGN_UP_FAILED]: state =>
        Object.assign({}, state, {
            signUpSuccessful: false
        }),
    [REGISTERED_USER_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            registeredUser: action.payload.registeredUser
        }),
    [SET_USER]: (state, action) =>
        Object.assign({}, state, {
            userSelect: action.payload.userSelect
        }),

};
