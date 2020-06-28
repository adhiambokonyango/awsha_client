
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    OBJECTIVE_PERCENTAGE_SUCCESSFULLY_REGISTERED,
    REGISTERING_OBJECTIVE_PERCENTAGE_FAILED,

    REGISTERED_OBJECTIVE_PERCENTAGE_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_OBJECTIVE_PERCENTAGE,
    REGISTERED_OBJECTIVE_PERCENTAGE_EMPTY_RESULTS,

    CONFIRM_DONE_OBJECTIVE_SUCCESSFUL,
    CONFIRM_DONE_OBJECTIVE_FAILED

} from "./actionTypes";

export function registerObjectivePercentage(payload) {
    return async dispatch => {
        const apiRoute = "/add_objective_percentage";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: OBJECTIVE_PERCENTAGE_SUCCESSFULLY_REGISTERED
                    });
                } else {
                    dispatch({
                        type: REGISTERING_OBJECTIVE_PERCENTAGE_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}




export function fetchAllObjectivePercentage() {
    return async dispatch => {
        const apiRoute = "/get_all_objective_percentage";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: REGISTERED_OBJECTIVE_PERCENTAGE_FETCHED_SUCCESSFULLY,
                        payload: {
                            registeredObjectivePercentage: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_OBJECTIVE_PERCENTAGE_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_OBJECTIVE_PERCENTAGE
                });
                console.log(err);
            }
        );
    };
}


export function sumAllObjectivePercentage() {
    return async dispatch => {
        const apiRoute = "/sum_all_objective_percentage";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: CONFIRM_DONE_OBJECTIVE_SUCCESSFUL,
                        payload: {
                            sumObjectivePercentage: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_OBJECTIVE_PERCENTAGE_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: CONFIRM_DONE_OBJECTIVE_FAILED
                });
                console.log(err);
            }
        );
    };
}

