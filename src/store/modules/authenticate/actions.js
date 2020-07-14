import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    USERS_FETCH_EMPTY_RESULT,
    USERS_FETCH_FAILED,
    USERS_FETCHED_SUCCESSFULLY, USERS_ROLES_FETCH_EMPTY_RESULT, USERS_ROLES_FETCH_FAILED,
    USERS_ROLES_FETCHED_SUCCESSFULLY,
    USERS_ACCESS_FETCHED_SUCCESSFULLY,
    USERS_ACCESS_FETCH_FAILED,
    USERS_ACCESS_FETCH_EMPTY_RESULT, PERMISSION_UPDATE_FAILED, PERMISSION_UPDATE_SUCCESSFULL,
    CHECK_PRIVILEGE, WRONG_CREDENTIALS, DENIED_ACCESS
} from "./actionTypes";
import {
    AN_ERROR_OCCURED_DURING_LOGIN,
    BEGIN_USER_AUTHENTIFICATION,
    RESET_WRONG_CREDENTIALS,
    STORE_USER,
    USER_LOGIN_SUCCESS, WRONG_LOGIN_CREDENTIALS
} from "../log_in/actionTypes";
import {PRIVILEGES_SUCCESSFULLY_UPDATED} from "../privileges/actionTypes";



export async function fetchAllRegisteredUsers() {
    return async dispatch => {
        const apiRoute = "/get_all_users";
        const list = apiGetAll(apiRoute);

        list.then(function (result) {
            if(result.data.results && result.data.results.length > 0){
                dispatch({
                    type: USERS_FETCHED_SUCCESSFULLY,
                    payload: {
                        users: result.data.results
                    }
                });
            }else if (result.data.results && result.data.results.length === 0) {
                dispatch({
                    type: USERS_FETCH_EMPTY_RESULT
                });
            }

        }, function (err){
            dispatch({
                type: USERS_FETCH_FAILED
            });
            console.log(err)
        })

    }

};


export async function fetchAllUserRoles() {
    return async dispatch => {
        const apiRoute = "get_all_user_roles";
        const list = apiGetAll(apiRoute);
        list.then(function (result) {
            if(result.data.results && result.data.results > 0)
            {
                dispatch({
                   type: USERS_ROLES_FETCHED_SUCCESSFULLY,
                   payload: {
                       roles: result.data.results
                   }
                });
            } else if (result.data.results && result.data.results === 0){
                dispatch({
                    type: USERS_ROLES_FETCH_EMPTY_RESULT
                })
            }

        }, function (err) {
            dispatch({
                type: USERS_ROLES_FETCH_FAILED
            })

        })
    }

};


export function fetchAllUserPrivileges() {
    return async dispatch => {
        const apiRoute = "/get_all_user_access_privileges";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: USERS_ACCESS_FETCHED_SUCCESSFULLY,
                        payload: {
                            privileges: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: USERS_ACCESS_FETCH_EMPTY_RESULT
                    });
                }
            },
            function(err) {
                dispatch({
                    type: USERS_ACCESS_FETCH_FAILED
                });
                console.log(err);
            }
        );
    };
}



export function updatePermissionStatus(payload) {
    return async dispatch => {
        const apiRoute = "/update_individual_user_access_privileges";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: PRIVILEGES_SUCCESSFULLY_UPDATED
                    });
                } else {
                    dispatch({
                        type: PERMISSION_UPDATE_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}



// authenticate user


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
                            // RoleType: REGULAR_SYSTEM_USER,
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