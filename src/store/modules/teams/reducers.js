
import {
    TEAMS_SUCCESSFULLY_REGISTERED,
    REGISTERED_TEAMS_FETCHED_SUCCESSFULLY,
    REGISTERING_TEAMS_FAILED,
    TEAM_LEAD_IS_CHECK_BOX_CHECKED_SUCCESSFULLY_UPDATED,
    TEAM_LEAD_SUCCESSFULLY_REGISTERED,
    SET_TEAM,
    TEAM_MEMBER_SUCCESSFULLY_REGISTERED,
    PROJECTS_AND_TEAMS_SUCCESSFULLY_FETCHED,
    PROJECTS_AND_TEAMS_FETCH_EMPTY,
    TEAM_AND_TEAM_LEAD_SUCCESSFULLY_FETCHED,
    TEAM_AND_TEAM_MEMBER_SUCCESSFULLY_FETCHED,
    TEAM_AND_TEAM_LEAD_FETCH_EMPTY,
    TEAM_AND_TEAM_MEMBER_FETCH_EMPTY,
    LEAD_IS_CHECK_BOX_CHECKED_SUCCESSFULLY_UPDATED,
    MEMBER_IS_CHECK_BOX_CHECKED_SUCCESSFULLY_UPDATED, SET_LEAD, SET_MEMBER, REGISTERING_TEAM_LEAD_FAILED
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
    [TEAM_LEAD_IS_CHECK_BOX_CHECKED_SUCCESSFULLY_UPDATED]: state =>
        Object.assign({}, state, {
            teamLeadIsCheckBoxCheckedSuccessFullyUpdated: true
        }),
    [TEAM_LEAD_SUCCESSFULLY_REGISTERED]: state =>
        Object.assign({}, state, {
            teamLeadSuccessFullyRegistered: true
        }),

    [REGISTERING_TEAM_LEAD_FAILED]: (state, action) =>
        Object.assign({}, state, {
            leadRegistrationUnsuccessful: true,
            leadRegistrationResponse: action.payload.leadRegistrationResponse
        }),

    [SET_TEAM]: (state, action) =>
        Object.assign({}, state, {
            teamSelected: action.payload.teamSelected
        }),
    [TEAM_MEMBER_SUCCESSFULLY_REGISTERED]: state =>
        Object.assign({}, state, {
            teamMemberSuccessFullyRegistered: true
        }),

    [PROJECTS_AND_TEAMS_SUCCESSFULLY_FETCHED]: (state, action) =>
        Object.assign({}, state, {
            teamFetch: true,
            fetchedProjectTeam: action.fetches.fetchedProjectTeam
        }),
    [PROJECTS_AND_TEAMS_FETCH_EMPTY]: state =>
        Object.assign({}, state, {
            teamFetch: false
        }),

    [TEAM_AND_TEAM_LEAD_SUCCESSFULLY_FETCHED]: (state, action) =>
        Object.assign({}, state, {
            leadFetch: true,
            fetchedTeamLead: action.fetches.fetchedTeamLead
        }),
    [TEAM_AND_TEAM_LEAD_FETCH_EMPTY]: state =>
        Object.assign({}, state, {
            leadFetch: false
        }),

    [TEAM_AND_TEAM_MEMBER_SUCCESSFULLY_FETCHED]: (state, action) =>
        Object.assign({}, state, {
            memberFetch: true,
            fetchedTeamMember: action.fetches.fetchedTeamMember
        }),
    [TEAM_AND_TEAM_MEMBER_FETCH_EMPTY]: state =>
        Object.assign({}, state, {
            memberFetch: false
        }),

    [LEAD_IS_CHECK_BOX_CHECKED_SUCCESSFULLY_UPDATED]: state =>
        Object.assign({}, state, {
            leadIsCheckBoxCheckedSuccessFullyUpdated: true
        }),

    [MEMBER_IS_CHECK_BOX_CHECKED_SUCCESSFULLY_UPDATED]: state =>
        Object.assign({}, state, {
            memberIsCheckBoxCheckedSuccessFullyUpdated: true
        }),

    [SET_LEAD]: (state, action) =>
        Object.assign({}, state, {
            leadSelected: action.payload.leadSelected
        }),

    [SET_MEMBER]: (state, action) =>
        Object.assign({}, state, {
            memberSelected: action.payload.memberSelected
        }),



};
