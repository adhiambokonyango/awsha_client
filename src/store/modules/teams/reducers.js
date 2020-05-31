
import {
    TEAMS_SUCCESSFULLY_REGISTERED,
    REGISTERED_TEAMS_FETCHED_SUCCESSFULLY,
    REGISTERING_TEAMS_FAILED,
} from "./actionTypes";

export const ACTION_HANDLERS = {

    [TEAMS_SUCCESSFULLY_REGISTERED]: state =>
        Object.assign({}, state, {
            teamsSuccessFullyRegistered: true
        }),
    [REGISTERING_TEAMS_FAILED]: state =>
        Object.assign({}, state, {
            teamsSuccessFullyRegistered: false
        }),
    [REGISTERED_TEAMS_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            registeredTeams: action.payload.registeredTeams
        }),


};
