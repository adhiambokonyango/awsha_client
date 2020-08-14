import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {

    ADMINISTRATOR_ACCESS_FETCHED_SUCCESSFULLY,
    ADMINISTRATOR_ACCESS_FETCH_FAILED,
    ADMINISTRATOR_ACCESS_FETCH_EMPTY_RESULT,
    PRIVILEGES_UPDATE_RESET,
    PERMISSION_UPDATE_FAILED,
    PRIVILEGES_SUCCESSFULLY_UPDATED
} from "./actionTypes";



export function updateAdministratorPermissionStatus(payload) {
    return async dispatch => {
        const apiRoute = "/update_individual_administrator_user_access_privileges";
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




export function fetchAllAdministratorUserPrivileges() {
    return async dispatch => {
        const apiRoute = "/get_administrator_user_privileges_by_full_description";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: ADMINISTRATOR_ACCESS_FETCHED_SUCCESSFULLY,
                        payload: {
                            administratorPrivilege: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: ADMINISTRATOR_ACCESS_FETCH_EMPTY_RESULT
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ADMINISTRATOR_ACCESS_FETCH_FAILED
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