
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    OBJECTIVES_SUCCESSFULLY_REGISTERED,
    REGISTERING_OBJECTIVES_FAILED,

    REGISTERED_OBJECTIVES_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_OBJECTIVES,
    REGISTERED_OBJECTIVES_EMPTY_RESULTS,
    SET_PERCENTAGE, SET_OBJECTIVE,
    PROJECTS_AND_OBJECTIVES_SUCCESSFULLY_FETCHED,
    PROJECTS_AND_OBJECTIVES_FETCH_FAILED


} from "./actionTypes";

export function registerObjectives(payload) {
    return async dispatch => {
        const apiRoute = "/add_objectives";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: OBJECTIVES_SUCCESSFULLY_REGISTERED
                    });
                } else {
                    dispatch({
                        type: REGISTERING_OBJECTIVES_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}




export function fetchAllObjectives() {
    return async dispatch => {
        const apiRoute = "/get_all_objectives";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: REGISTERED_OBJECTIVES_FETCHED_SUCCESSFULLY,
                        payload: {
                            registeredObjectives: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_OBJECTIVES_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_OBJECTIVES
                });
                console.log(err);
            }
        );
    };
}

export function setObjectivePercentage(percentageSelect){
    return async dispatch => {
        dispatch({
            type: SET_PERCENTAGE,
            payload: {
                percentageSelect: percentageSelect
            }
        });
    };
}

export function setObjective(objectiveSelect){
    return async dispatch => {
        dispatch({
            type: SET_OBJECTIVE,
            payload: {
                objectiveSelect: objectiveSelect
            }
        });
    };
}

export function projectSelectionQuery(payload) {
    return async dispatch => {
        const apiRoute = "/objectives_project_select_query";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: PROJECTS_AND_OBJECTIVES_SUCCESSFULLY_FETCHED,
                        fetches: {
                            fetchedProjectObjective: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0){
                    dispatch({
                        type: PROJECTS_AND_OBJECTIVES_FETCH_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}
