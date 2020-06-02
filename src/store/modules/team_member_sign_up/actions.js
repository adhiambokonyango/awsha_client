
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    SIGN_UP_SUCCESSFUL,
    SIGN_UP_FAILED,

    REGISTERED_TEAM_MEMBER_FETCHED_SUCCESSFULLY,
    REGISTERED_TEAM_MEMBER_EMPTY_RESULTS,
    ERROR_FETCHING_TEAM_MEMBER

} from "./actionTypes";

export function registerTeamMember(payload) {
    return async dispatch => {
        const apiRoute = "/team_members_registration";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: SIGN_UP_SUCCESSFUL
                    });
                } else {
                    dispatch({
                        type: SIGN_UP_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}




export function fetchAllTeamMember() {
    return async dispatch => {
        const apiRoute = "/get_all_team_members";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: REGISTERED_TEAM_MEMBER_FETCHED_SUCCESSFULLY,
                        payload: {
                            registeredTeamMember: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_TEAM_MEMBER_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_TEAM_MEMBER
                });
                console.log(err);
            }
        );
    };
}
