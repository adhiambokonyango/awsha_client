import {
    STORE_USER,
    // BEGIN_USER_AUTHENTIFICATION,
    //
    // USER_LOGIN_SUCCESS,
    // AN_ERROR_OCCURED_DURING_LOGIN,
    RESET_WRONG_CREDENTIALS,
    WRONG_LOGIN_CREDENTIALS


} from "./actionTypes";

export const ACTION_HANDLERS = {
    [STORE_USER]: (state, action) =>
        Object.assign({}, state, {
            isLoginSuccessful: true,
            // session_details: action.payload.session_details,
            // // RoleType: action.payload.RoleType,
            // isSessionActive: action.payload.isSessionActive
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