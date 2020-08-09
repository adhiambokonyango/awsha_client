
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    SIGN_UP_SUCCESSFUL,
    SIGN_UP_FAILED,

    REGISTERED_ADMIN_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_ADMIN,
    REGISTERED_ADMIN_EMPTY_RESULTS

} from "./actionTypes";

export function registerAdmin(payload) {
    return async dispatch => {
        const apiRoute = "/system_admin_registration";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: SIGN_UP_SUCCESSFUL
                    });
                } else {
                    dispatch({
                        type: SIGN_UP_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}




export function fetchAllAdmin() {
    return async dispatch => {
        const apiRoute = "/get_all_system_admin";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: REGISTERED_ADMIN_FETCHED_SUCCESSFULLY,
                        payload: {
                            registeredAdmin: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_ADMIN_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_ADMIN
                });
                console.log(err);
            }
        );
    };
}
