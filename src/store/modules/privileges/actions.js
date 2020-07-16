import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    USERS_FETCH_EMPTY_RESULT,
    USERS_FETCH_FAILED,
    USERS_FETCHED_SUCCESSFULLY, USERS_ROLES_FETCH_EMPTY_RESULT, USERS_ROLES_FETCH_FAILED,
    USERS_ROLES_FETCHED_SUCCESSFULLY,
    USERS_ACCESS_FETCHED_SUCCESSFULLY,
    USERS_ACCESS_FETCH_FAILED,
    USERS_ACCESS_FETCH_EMPTY_RESULT, UPDATED_PRIVILEGES_FAILED,
    PRIVILEGES_UPDATE_RESET,
    PERMISSION_UPDATE_FAILED
} from "./actionTypes";

import {PRIVILEGES_SUCCESSFULLY_UPDATED} from "./actionTypes";


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




export function resetPrivilegeUpdate() {
    return async dispatch => {
        dispatch({
            type: PRIVILEGES_UPDATE_RESET
        });
    };
}