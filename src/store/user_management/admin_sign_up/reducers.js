
import {
    SIGN_UP_SUCCESSFUL,
    REGISTERED_ADMIN_FETCHED_SUCCESSFULLY,
    SIGN_UP_FAILED
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
    [REGISTERED_ADMIN_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            registeredAdmin: action.payload.registeredAdmin
        }),


};
