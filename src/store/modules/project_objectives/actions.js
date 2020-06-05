
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    PROJECT_OBJECTIVES_SUCCESSFULLY_REGISTERED,
    REGISTERING_PROJECT_OBJECTIVES_FAILED,

    REGISTERED_PROJECT_OBJECTIVES_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_PROJECT_OBJECTIVES,
    REGISTERED_PROJECT_OBJECTIVES_EMPTY_RESULTS

} from "./actionTypes";

export function registerProjectObjectives(payload) {
    return async dispatch => {
        const apiRoute = "/add_project_objectives";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: PROJECT_OBJECTIVES_SUCCESSFULLY_REGISTERED
                    });
                } else {
                    dispatch({
                        type: REGISTERING_PROJECT_OBJECTIVES_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}




export function fetchAllProjectObjectives() {
    return async dispatch => {
        const apiRoute = "/get_all_project_objectives";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: REGISTERED_PROJECT_OBJECTIVES_FETCHED_SUCCESSFULLY,
                        payload: {
                            registeredProjectObjectives: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_PROJECT_OBJECTIVES_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_PROJECT_OBJECTIVES
                });
                console.log(err);
            }
        );
    };
}
