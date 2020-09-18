import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {

    USERS_ACCESS_FETCHED_SUCCESSFULLY,
    USERS_ACCESS_FETCH_FAILED,
    USERS_ACCESS_FETCH_EMPTY_RESULT,
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
export function fetchAllUserPrivileges() {
    return async dispatch => {
        const apiRoute = "/get_user_privileges_by_full_description";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: USERS_ACCESS_FETCHED_SUCCESSFULLY,
                        payload: {
                            privilege: result.data.results
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