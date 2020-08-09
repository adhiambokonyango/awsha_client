
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    SIGN_UP_SUCCESSFUL,
    SIGN_UP_FAILED,

    REGISTERED_ADMINISTRATOR_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_ADMINISTRATOR,
    REGISTERED_ADMINISTRATOR_EMPTY_RESULTS

} from "./actionTypes";

export function registerAdministrator(payload) {
    return async dispatch => {
        const apiRoute = "/office_admin_registration";
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




export function fetchAllAdministrator() {
    return async dispatch => {
        const apiRoute = "/get_all_office_admin";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: REGISTERED_ADMINISTRATOR_FETCHED_SUCCESSFULLY,
                        payload: {
                            registeredAdministrator: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_ADMINISTRATOR_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_ADMINISTRATOR
                });
                console.log(err);
            }
        );
    };
}
