import {USER_SESSION_LOG_FETCH_SUCCESSFULLY, USER_SESSION_LOG_REGISTERED_SUCCESSFULLY} from "./actionTypes";

export const ACTION_HANDLERS = {
    [USER_SESSION_LOG_REGISTERED_SUCCESSFULLY]: state => {
        Object.assign({}, state, {
            sessionLogRegisterSuccessful: true
        })
    },
    [USER_SESSION_LOG_FETCH_SUCCESSFULLY]: (state, action) => {
        Object.assign({}, state, {
            registeredSessionLogs: action.payload.registeredSessionLogs
        })
    }
}