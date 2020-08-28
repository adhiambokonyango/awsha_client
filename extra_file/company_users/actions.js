
import {apiGetAll, apiPost} from "../../src/services/api_connector/ApiConnector";
import {
    COMPANY_USER_SUCCESSFULLY_REGISTERED,
    REGISTERING_COMPANY_USER_FAILED,

    REGISTERED_COMPANY_USER_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_COMPANY_USER,
    REGISTERED_COMPANY_USER_EMPTY_RESULTS

} from "./actionTypes";

export function registerCompanyUser(payload) {
    return async dispatch => {
        const apiRoute = "/add_company_user";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: COMPANY_USER_SUCCESSFULLY_REGISTERED
                    });
                } else {
                    dispatch({
                        type: REGISTERING_COMPANY_USER_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}




export function fetchAllCompanyUser() {
    return async dispatch => {
        const apiRoute = "/get_all_company_user";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: REGISTERED_COMPANY_USER_FETCHED_SUCCESSFULLY,
                        payload: {
                            registeredCompanyUser: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_COMPANY_USER_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_COMPANY_USER
                });
                console.log(err);
            }
        );
    };
}
