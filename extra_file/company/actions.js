
import {apiGetAll, apiPost} from "../../src/services/api_connector/ApiConnector";
import {
    COMPANY_SUCCESSFULLY_REGISTERED,
    REGISTERING_COMPANY_FAILED,

    REGISTERED_COMPANY_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_COMPANY,
    REGISTERED_COMPANY_EMPTY_RESULTS

} from "./actionTypes";

export function registerCompany(payload) {
    return async dispatch => {
        const apiRoute = "/add_company";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: COMPANY_SUCCESSFULLY_REGISTERED
                    });
                } else {
                    dispatch({
                        type: REGISTERING_COMPANY_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}




export function fetchAllCompany() {
    return async dispatch => {
        const apiRoute = "/get_all_company";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: REGISTERED_COMPANY_FETCHED_SUCCESSFULLY,
                        payload: {
                            registeredCompany: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_COMPANY_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_COMPANY
                });
                console.log(err);
            }
        );
    };
}
