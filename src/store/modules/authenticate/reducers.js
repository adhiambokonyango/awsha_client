import {
    CHECK_ROLE, USERS_ACCESS_FETCHED_SUCCESSFULLY, USERS_FETCHED_SUCCESSFULLY, USERS_ROLES_FETCHED_SUCCESSFULLY,
    WRONG_CREDENTIALS,
} from "./actionTypes";
import {STORE_USER,WRONG_LOGIN_CREDENTIALS, RESET_WRONG_CREDENTIALS } from "../log_in/actionTypes";
import {REGISTERED_COMPANY_FETCHED_SUCCESSFULLY} from "../company/actionTypes";

    export const ACTION_HANDLERS = {
        [STORE_USER]: (state, action) =>
            Object.assign({}, state, {
                isLoginSuccessful: true,
                // session_details: action.payload.session_details,
                // RoleType: action.payload.RoleType,
                 isSessionActive: action.payload.isSessionActive
            }),

        [WRONG_LOGIN_CREDENTIALS]: state =>
            Object.assign({}, state, {
                hasWrongLoginCredentials: true
            }),
        [RESET_WRONG_CREDENTIALS]: state =>
            Object.assign({}, state, {
                hasWrongLoginCredentials: false
            }),
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
                privileges: action.payload.privileges
            }),

    };



