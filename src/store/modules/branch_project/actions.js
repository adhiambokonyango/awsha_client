import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {

    BRANCH_PROJECT_FETCHED_SUCCESSFULLY,
    BRANCH_PROJECT_FETCH_FAILED,
    BRANCH_PROJECT_FETCH_EMPTY_RESULT,
    BRANCH_PROJECT_STATUS_RESET,
    BRANCH_PROJECT_STATUS_UPDATE_FAILED
} from "./actionTypes";

import {BRANCH_PROJECT_STATUS_SUCCESSFULLY_UPDATED} from "./actionTypes";


export function updateBranchProjectStatus(payload) {
    return async dispatch => {
        const apiRoute = "/update_individual_branch_project_status";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: BRANCH_PROJECT_STATUS_SUCCESSFULLY_UPDATED
                    });
                } else {
                    dispatch({
                        type: BRANCH_PROJECT_STATUS_UPDATE_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}




export function fetchAllBranchProjects() {
    return async dispatch => {
        const apiRoute = "/get_all_branch_projects_by_full_description";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: BRANCH_PROJECT_FETCHED_SUCCESSFULLY,
                        payload: {
                            branch: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: BRANCH_PROJECT_FETCH_EMPTY_RESULT
                    });
                }
            },
            function(err) {
                dispatch({
                    type: BRANCH_PROJECT_FETCH_FAILED
                });
                console.log(err);
            }
        );
    };
}




export function resetPrivilegeUpdate() {
    return async dispatch => {
        dispatch({
            type: BRANCH_PROJECT_STATUS_RESET
        });
    };
}