
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    PROJECTS_SUCCESSFULLY_REGISTERED,
    REGISTERING_PROJECTS_FAILED,

    REGISTERED_PROJECTS_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_PROJECTS,
    REGISTERED_PROJECTS_EMPTY_RESULTS

} from "./actionTypes";

export function registerProjects(payload) {
    return async dispatch => {
        const apiRoute = "/add_projects";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: PROJECTS_SUCCESSFULLY_REGISTERED,
                        payload: {
                           project_session_details: result.data,
                        }
                    });
                } else {
                    dispatch({
                        type: REGISTERING_PROJECTS_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}




export function fetchAllProjects() {
    return async dispatch => {
        const apiRoute = "/get_all_projects";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: REGISTERED_PROJECTS_FETCHED_SUCCESSFULLY,
                        payload: {
                            registeredProjects: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_PROJECTS_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_PROJECTS
                });
                console.log(err);
            }
        );
    };
}
