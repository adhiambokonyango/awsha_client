import {
    PRIVILEGES_SUCCESSFULLY_UPDATED,
    USERS_ACCESS_FETCHED_SUCCESSFULLY,

} from "./actionTypes";

export const ACTION_HANDLERS = {

    [PRIVILEGES_SUCCESSFULLY_UPDATED]: state =>
        Object.assign({}, state, {
            privilegeSuccessFullyUpdated: true
        }),


    [USERS_ACCESS_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            privilege: action.payload.privilege
        }),

};