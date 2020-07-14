
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    PRIVILEGES_SUCCESSFULLY_UPDATED,
    UPDATED_PRIVILEGES_FAILED,

    REGISTERED_PRIVILEGES_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_PRIVILEGES,
    REGISTERED_PRIVILEGES_EMPTY_RESULTS, PRIVILEGES_UPDATE_RESET

} from "./actionTypes";
import {RESET_WRONG_CREDENTIALS} from "../log_in/actionTypes";

export function updatingPrivileges(payload) {
    return async dispatch => {
        const apiRoute = "/add_company";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: PRIVILEGES_SUCCESSFULLY_UPDATED
                    });
                } else {
                    dispatch({
                        type: UPDATED_PRIVILEGES_FAILED
                    });
                }
            },
            function(err) {
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




export function fetchAllUserPrivileges() {
    return async dispatch => {
        const apiRoute = "/get_all_company";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: REGISTERED_PRIVILEGES_FETCHED_SUCCESSFULLY,
                        payload: {
                            registeredPrivileges: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_PRIVILEGES_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_PRIVILEGES
                });
                console.log(err);
            }
        );
    };
}
