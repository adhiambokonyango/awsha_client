
import {
    TEAM_MEMBER_SUCCESSFULLY_REGISTERED,
    REGISTERED_TEAM_MEMBER_FETCHED_SUCCESSFULLY,
    REGISTERING_TEAM_MEMBER_FAILED
} from "./actionTypes";

export const ACTION_HANDLERS = {

    [TEAM_MEMBER_SUCCESSFULLY_REGISTERED]: state =>
        Object.assign({}, state, {
            teamMemberSuccessFullyRegistered: true
        }),
    [REGISTERING_TEAM_MEMBER_FAILED]: state =>
        Object.assign({}, state, {
            teamMemberSuccessFullyRegistered: false
        }),
    [REGISTERED_TEAM_MEMBER_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            registeredTeamMember: action.payload.registeredTeamMember
        }),


};
