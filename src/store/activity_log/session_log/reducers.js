import {SESSION_LOG_FETCH_SUCCESSFULLY, SESSION_LOG_REGISTERED_SUCCESSFULLY} from "./actionTypes";

export const ACTION_HANDLERS = {
    [SESSION_LOG_REGISTERED_SUCCESSFULLY]: state => {
        Object.assign({}, state, {
            sessionLogRegisterSuccessful: true
        })
    },
    [SESSION_LOG_FETCH_SUCCESSFULLY]: (state, action) => {
        Object.assign({}, state, {
            registeredSessionLogs: action.payload.registeredSessionLogs
        })
    }
}