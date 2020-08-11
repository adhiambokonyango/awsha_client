import {
     ADMIN_ACCESS_FETCHED_SUCCESSFULLY,
    PRIVILEGES_SUCCESSFULLY_UPDATED

} from "./actionTypes";

export const ACTION_HANDLERS = {

    [PRIVILEGES_SUCCESSFULLY_UPDATED]: (state, action) =>
        Object.assign({}, state, {
            adminPrivilegeSuccessFullyUpdated: true,
        }),


    [ADMIN_ACCESS_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            adminPrivilege: action.payload.adminPrivilege
        }),

};