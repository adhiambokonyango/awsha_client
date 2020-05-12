
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    SYSTEM_ADMIN_SUCCESSFULLY_REGISTERED,
    REGISTERING_SYSTEM_ADMIN_FAILED,

    REGISTERED_SYSTEM_ADMIN_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_SYSTEM_ADMIN,
    REGISTERED_SYSTEM_ADMIN_EMPTY_RESULTS

} from "./actionTypes";

export function registerSystemAdmin(payload) {
    return async dispatch => {
        const apiRoute = "/system_admin_registration";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: SYSTEM_ADMIN_SUCCESSFULLY_REGISTERED
                    });
                } else {
                    dispatch({
                        type: REGISTERING_SYSTEM_ADMIN_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}




export function fetchAllSystemAdmin() {
    return async dispatch => {
        const apiRoute = "/get_all_system_admins";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: REGISTERED_SYSTEM_ADMIN_FETCHED_SUCCESSFULLY,
                        payload: {
                            registeredSystemAdmin: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_SYSTEM_ADMIN_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_SYSTEM_ADMIN
                });
                console.log(err);
            }
        );
    };
}
