import {
    BEGIN_USER_AUTHENTIFICATION,USER_LOGIN_SUCCESS,
    AN_ERROR_OCCURED_DURING_LOGIN,

    SUCCESSFULLY_FETCHED_ALL_USERS, ERROR_OCCURED_WHILE_FETCHING_ALL_USERS,
    USER_ROLE_UPDATED_SUCCESSFULLY, USER_ROLE_UPDATE_FAILED, ERROR_OCCURRED_WHILE_UPDATING_USER_ROLE,
    USER_ACCESS_PRIVILEGE_UPDATED_SUCCESSFULLY, USER_ACCESS_PRIVILEGE_UPDATE_FAILED,
    ERROR_OCCURRED_WHILE_UPDATING_USER_ACCESS_PRIVILEGE,
    SYSTEM_ADMIN,STORE_USER, WRONG_LOGIN_CREDENTIALS,REGULAR_SYSTEM_USER,


} from "./actionTypes";
import {apiPost, apiGetAll, promiselessApiPost} from "../../../services/api_connector/ApiConnector";
import {ADMIN_ROLE, BURSAR_ROLE} from "../../../config/constants/RolesConfig";
import {RESET_WRONG_CREDENTIALS} from "../log_in/actionTypes";

export function resetWrongCredentials() {
    return async dispatch => {
        dispatch({
            type: RESET_WRONG_CREDENTIALS
        });
    };
}

export function authenticateSystemUser(payload) {
    return async dispatch => {
        dispatch({
            type: BEGIN_USER_AUTHENTIFICATION
        });
        const apiRoute = "/login";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (!result.data.error) {
                    dispatch({
                        type: STORE_USER,
                        payload: {
                            session_details: result.data,
                            RoleType: REGULAR_SYSTEM_USER,
                            isSessionActive: true
                        }
                    });
                    dispatch({
                        type: USER_LOGIN_SUCCESS
                    });
                } else {
                    dispatch({
                        type: WRONG_LOGIN_CREDENTIALS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: AN_ERROR_OCCURED_DURING_LOGIN
                });
                console.log(err);
            }
        );
    };
}

export function authenticateSystemAdmin(payload) {
    return async dispatch => {
        dispatch({
            type: BEGIN_USER_AUTHENTIFICATION
        });
        const apiRoute = "/system_admin_login";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (!result.data.error) {
                    dispatch({
                        type: STORE_USER,
                        payload: {
                            session_details: result.data,
                            RoleType: SYSTEM_ADMIN,
                            isSessionActive: true
                        }
                    });
                    dispatch({
                        type: USER_LOGIN_SUCCESS
                    });
                } else {
                    dispatch({
                        type: WRONG_LOGIN_CREDENTIALS,

                    });
                }
            },
            function(err) {
                dispatch({
                    type: AN_ERROR_OCCURED_DURING_LOGIN
                });
                console.log(err);
            }
        );
    };
}


export function authenticateOfficeAdmin(payload) {
    return async dispatch => {
        dispatch({
            type: BEGIN_USER_AUTHENTIFICATION
        });
        const apiRoute = "/office_admin_login";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (!result.data.error) {
                    dispatch({
                        type: STORE_USER,
                        payload: {
                            session_details: result.data,
                            RoleType: SYSTEM_ADMIN,
                            isSessionActive: true
                        }
                    });
                    dispatch({
                        type: USER_LOGIN_SUCCESS
                    });
                } else {
                    dispatch({
                        type: WRONG_LOGIN_CREDENTIALS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: AN_ERROR_OCCURED_DURING_LOGIN
                });
                console.log(err);
            }
        );
    };
}





export function getAllUsers() {
    return async dispatch => {

        try {
            const users = await apiGetAll("/get_all_users");
            dispatch({
                type: SUCCESSFULLY_FETCHED_ALL_USERS,
                payload: {
                    allUsers: users.data
                }
            });
        } catch (e) {
            console.log(e);
            dispatch({
                type: ERROR_OCCURED_WHILE_FETCHING_ALL_USERS
            });
        }

    };

}



export const getAUsersRoles = payload =>
    promiselessApiPost(payload, "/get_a_user_roles");

export const getARolesAccessPrivileges = payload =>
    promiselessApiPost(payload, "/get_a_user_access_privileges");

export function updateAUserRole(payload) {
    return async dispatch => {
        const apiRoute = "/update_individual_user_roles";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: USER_ROLE_UPDATED_SUCCESSFULLY
                    });
                } else {
                    dispatch({
                        type: USER_ROLE_UPDATE_FAILED
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_OCCURRED_WHILE_UPDATING_USER_ROLE
                });
                console.log(err);
            }
        );
    };
}

export function updateAUserAccessPrivileges(payload) {
    return async dispatch => {
        const apiRoute = "/update_individual_user_access_privileges";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: USER_ACCESS_PRIVILEGE_UPDATED_SUCCESSFULLY
                    });
                } else {
                    dispatch({
                        type: USER_ACCESS_PRIVILEGE_UPDATE_FAILED
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_OCCURRED_WHILE_UPDATING_USER_ACCESS_PRIVILEGE
                });
                console.log(err);
            }
        );
    };
}

export function closeASessionLog(payload) {
    const apiRoute = "/update_individual_session_logs";
    apiPost(payload, apiRoute);
}