import {
    ADMINISTRATOR_ACCESS_FETCH_EMPTY_RESULT,
    ADMINISTRATOR_ACCESS_FETCHED_SUCCESSFULLY,
    PRIVILEGES_SUCCESSFULLY_UPDATED

} from "./actionTypes";

export const ACTION_HANDLERS = {

    [PRIVILEGES_SUCCESSFULLY_UPDATED]: (state, action) =>
        Object.assign({}, state, {
            administratorPrivilegeSuccessFullyUpdated: true,
        }),


    [ADMINISTRATOR_ACCESS_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            administratorPrivilege: action.payload.administratorPrivilege
        }),

};