
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    TEAMS_SUCCESSFULLY_REGISTERED,
    REGISTERING_TEAMS_FAILED,

    REGISTERED_TEAMS_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_TEAMS,
    REGISTERED_TEAMS_EMPTY_RESULTS

} from "./actionTypes";

export function registerTeams(payload) {
    return async dispatch => {
        const apiRoute = "/add_company";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: TEAMS_SUCCESSFULLY_REGISTERED
                    });
                } else {
                    dispatch({
                        type: REGISTERING_TEAMS_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}




export function fetchAllTeams() {
    return async dispatch => {
        const apiRoute = "/get_all_company";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: REGISTERED_TEAMS_FETCHED_SUCCESSFULLY,
                        payload: {
                            registeredTeams: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_TEAMS_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_TEAMS
                });
                console.log(err);
            }
        );
    };
}
