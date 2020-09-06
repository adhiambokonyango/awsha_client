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
            isSessionActive: true
        }),

    [STORE_ADMIN]: (state, action) =>
        Object.assign({}, state, {
            isAdminLoginSuccessful: true,
            admin_session_details: action.payload.session_details,
            isSessionActive: true
        }),

    [STORE_OFFICE_ADMINISTRATOR]: (state, action) =>
        Object.assign({}, state, {
            isOfficeAdministratorLoginSuccessful: true,
            administrator_session_details: action.payload.session_details,
            isSessionActive: true
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