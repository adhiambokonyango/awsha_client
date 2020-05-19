
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    GENDER_SUCCESSFULLY_REGISTERED,
    REGISTERING_GENDER_FAILED,

    REGISTERED_GENDER_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_GENDER,
    REGISTERED_GENDER_EMPTY_RESULTS

} from "./actionTypes";

export function registerGender(payload) {
    return async dispatch => {
        const apiRoute = "/add_gender";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: GENDER_SUCCESSFULLY_REGISTERED
                    });
                } else {
                    dispatch({
                        type: REGISTERING_GENDER_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}




export function fetchAllGender() {
    return async dispatch => {
        const apiRoute = "/get_all_gender";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: REGISTERED_GENDER_FETCHED_SUCCESSFULLY,
                        payload: {
                            registeredGender: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_GENDER_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_GENDER
                });
                console.log(err);
            }
        );
    };
}
