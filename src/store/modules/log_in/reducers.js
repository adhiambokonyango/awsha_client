import {
    STORE_USER,
    // BEGIN_USER_AUTHENTIFICATION,
    //
    // USER_LOGIN_SUCCESS,
    // AN_ERROR_OCCURED_DURING_LOGIN,
    RESET_WRONG_CREDENTIALS,
    WRONG_LOGIN_CREDENTIALS, STORE_ADMIN, STORE_OFFICE_ADMINISTRATOR


} from "./actionTypes";

export const ACTION_HANDLERS = {
    [STORE_USER]: (state, action) =>
        Object.assign({}, state, {
            isLoginSuccessful: true,
           session_details: action.payload.session_details,
            // RoleType: action.payload.RoleType,
            isSessionActive: action.payload.isSessionActive
        }),

    [STORE_ADMIN]: (state, action) =>
        Object.assign({}, state, {
            isAdminLoginSuccessful: true,
            session_details: action.payload.session_details,
            // RoleType: action.payload.RoleType,
            isSessionActive: action.payload.isSessionActive
        }),

    [STORE_OFFICE_ADMINISTRATOR]: (state, action) =>
        Object.assign({}, state, {
            isOfficeAdministratorLoginSuccessful: true,
            session_details: action.payload.session_details,
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

};