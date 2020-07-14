
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    SIGN_UP_SUCCESSFUL,
    SIGN_UP_FAILED,

    REGISTERED_USER_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_USER,
    REGISTERED_USER_EMPTY_RESULTS

} from "./actionTypes";

export function registerUser(payload) {
    return async dispatch => {
        const apiRoute = "/user_registration";
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




export function fetchAllUser() {
    return async dispatch => {
        const apiRoute = "/get_all_users";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: REGISTERED_USER_FETCHED_SUCCESSFULLY,
                        payload: {
                            registeredUser: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_USER_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_USER
                });
                console.log(err);
            }
        );
    };
}
