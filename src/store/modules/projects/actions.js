
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    PROJECTS_SUCCESSFULLY_REGISTERED,
    REGISTERING_PROJECTS_FAILED,

    REGISTERED_PROJECTS_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_PROJECTS,
    REGISTERED_PROJECTS_EMPTY_RESULTS,
    BEGIN_PROJECT_SELECTION,
    STORE_PROJECT,
    PROJECT_SELECTION_SUCCESS,
    WRONG_SELECTION,
    AN_ERROR_OCCURED_DURING_SELECTION


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

export function projectSelect(payload) {
    return async dispatch => {
        dispatch({
            type: BEGIN_PROJECT_SELECTION
        });
        const apiRoute = "/project_selection";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (!result.data.error) {
                    dispatch({
                        type: STORE_PROJECT,
                        payload: {
                            isSelectionSuccessful:false,
                            project_session_details: result.data,
                            isProjectSessionActive: true
                        }
                    });
                    dispatch({
                        type: PROJECT_SELECTION_SUCCESS
                    });


                } else {
                    dispatch({
                        type: WRONG_SELECTION
                    });
                }
            },
            function(err) {
                dispatch({
                    type: AN_ERROR_OCCURED_DURING_SELECTION
                });
                console.log(err);
            }
        );
    };
}