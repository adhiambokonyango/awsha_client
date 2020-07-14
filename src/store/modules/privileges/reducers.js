
import {
    PRIVILEGES_SUCCESSFULLY_UPDATED, PRIVILEGES_UPDATE_RESET,
    REGISTERED_PRIVILEGES_FETCHED_SUCCESSFULLY,
} from "./actionTypes";

export const ACTION_HANDLERS = {

    [PRIVILEGES_SUCCESSFULLY_UPDATED]: state =>
        Object.assign({}, state, {
            privilegeSuccessFullyUpdated: true
        }),
    [PRIVILEGES_UPDATE_RESET]: state =>
        Object.assign({}, state, {
            privilegeSuccessFullyUpdated: false
        }),
    [REGISTERED_PRIVILEGES_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            registeredPrivileges: action.payload.registeredPrivileges
        }),


};
