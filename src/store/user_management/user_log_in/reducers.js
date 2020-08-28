import {
    STORE_USER,
    RESET_WRONG_CREDENTIALS,
    WRONG_LOGIN_CREDENTIALS,
    STORE_ADMIN,
    STORE_OFFICE_ADMINISTRATOR,
    AN_ERROR_OCCURED_DURING_LOGIN,



} from "./actionTypes";

export const ACTION_HANDLERS = {
    [STORE_USER]: (state, action) =>
        Object.assign({}, state, {
            isLoginSuccessful: true,
           session_details: action.payload.session_details,
            isSessionActive: action.payload.isSessionActive
        }),

    [STORE_ADMIN]: (state, action) =>
        Object.assign({}, state, {
            isAdminLoginSuccessful: true,
            session_details: action.payload.session_details,
            isSessionActive: action.payload.isSessionActive
        }),

    [STORE_OFFICE_ADMINISTRATOR]: (state, action) =>
        Object.assign({}, state, {
            isOfficeAdministratorLoginSuccessful: true,
            session_details: action.payload.session_details,
            isSessionActive: action.payload.isSessionActive
        }),

    [WRONG_LOGIN_CREDENTIALS]: state =>
        Object.assign({}, state, {
            hasWrongLoginCredentials: true
        }),
    [AN_ERROR_OCCURED_DURING_LOGIN]: state =>
        Object.assign({}, state, {
            accessDenied: true
        }),

    [RESET_WRONG_CREDENTIALS]: state =>
        Object.assign({}, state, {
            hasWrongLoginCredentials: false
        }),


};