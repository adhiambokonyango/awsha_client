
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    TEAMS_SUCCESSFULLY_REGISTERED,
    REGISTERING_TEAMS_FAILED,

    REGISTERED_TEAMS_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_TEAMS,
    REGISTERED_TEAMS_EMPTY_RESULTS,
    TEAM_LEAD_SUCCESSFULLY_REGISTERED,
    REGISTERING_TEAM_LEAD_FAILED,
    TEAM_MEMBER_SUCCESSFULLY_REGISTERED, REGISTERING_TEAM_MEMBER_FAILED

} from "./actionTypes";

export function registerTeams(payload) {
    return async dispatch => {
        const apiRoute = "/add_team";
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
        const apiRoute = "/get_all_team";
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


export function registerTeamLead(payload) {
    return async dispatch => {
        const apiRoute = "/add_team_leaders";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: TEAM_LEAD_SUCCESSFULLY_REGISTERED
                    });
                } else {
                    dispatch({
                        type: REGISTERING_TEAM_LEAD_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}

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
