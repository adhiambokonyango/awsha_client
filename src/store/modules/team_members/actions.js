
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    TEAM_MEMBER_SUCCESSFULLY_REGISTERED,
    REGISTERING_TEAM_MEMBER_FAILED,

    REGISTERED_TEAM_MEMBER_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_TEAM_MEMBER,
    REGISTERED_TEAM_MEMBER_EMPTY_RESULTS

} from "./actionTypes";

export function registerTeamMember(payload) {
    return async dispatch => {
        const apiRoute = "/add_team_members";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: TEAM_MEMBER_SUCCESSFULLY_REGISTERED
                    });
                } else {
                    dispatch({
                        type: REGISTERING_TEAM_MEMBER_FAILED
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
