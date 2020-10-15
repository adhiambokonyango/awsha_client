
import {
    IS_CHECK_BOX_CHECKED_SUCCESSFULLY_UPDATED,
    OBJECTIVES_SUCCESSFULLY_REGISTERED,
    PROJECTS_AND_OBJECTIVES_FETCH_FAILED,
    PROJECTS_AND_OBJECTIVES_SUCCESSFULLY_FETCHED,
    REGISTERED_OBJECTIVES_FETCHED_SUCCESSFULLY,
    REGISTERING_OBJECTIVES_FAILED,
    SET_OBJECTIVE,
    SET_PERCENTAGE
} from "./actionTypes";
import {PROJECT_PROGRESS_SUCCESSFULLY_UPDATED} from "../projects/actionTypes";

export const ACTION_HANDLERS = {

    [OBJECTIVES_SUCCESSFULLY_REGISTERED]: state =>
        Object.assign({}, state, {
            objectivesSuccessFullyRegistered: true
        }),
    [REGISTERING_OBJECTIVES_FAILED]: state =>
        Object.assign({}, state, {
            objectivesSuccessFullyRegistered: false
        }),
    [REGISTERED_OBJECTIVES_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            registeredObjectives: action.payload.registeredObjectives
        }),
    [SET_PERCENTAGE]: (state, action) =>
        Object.assign({}, state, {
            percentageSelect: action.payload.percentageSelect
        }),
    [SET_OBJECTIVE]: (state, action) =>
        Object.assign({}, state, {
            objectiveSelect: action.payload.objectiveSelect
        }),
    [PROJECTS_AND_OBJECTIVES_SUCCESSFULLY_FETCHED]: (state, action) =>
        Object.assign({}, state, {
            groupFetch: true,
             fetchedProjectObjective: action.fetches.fetchedProjectObjective
        }),
    [PROJECTS_AND_OBJECTIVES_FETCH_FAILED]: state =>
        Object.assign({}, state, {
            groupFetch: false
        }),
    [IS_CHECK_BOX_CHECKED_SUCCESSFULLY_UPDATED]: state =>
        Object.assign({}, state, {
            isCheckBoxCheckedSuccessFullyUpdated: true
        }),


};
