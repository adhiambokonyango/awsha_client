import {
     USERS_ACCESS_FETCHED_SUCCESSFULLY, USERS_FETCHED_SUCCESSFULLY, USERS_ROLES_FETCHED_SUCCESSFULLY,

} from "./actionTypes";

export const ACTION_HANDLERS = {

    [USERS_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            users: action.payload.users
        }),

    [USERS_ROLES_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            roles: action.payload.roles
        }),
    [USERS_ACCESS_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            privilege: action.payload.privilege
        }),

};