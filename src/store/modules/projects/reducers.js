
import {
    PROJECTS_SUCCESSFULLY_REGISTERED,
    REGISTERED_PROJECTS_FETCHED_SUCCESSFULLY,
    REGISTERING_PROJECTS_FAILED
} from "./actionTypes";

export const ACTION_HANDLERS = {

    [PROJECTS_SUCCESSFULLY_REGISTERED]: state =>
        Object.assign({}, state, {
            projectsSuccessFullyRegistered: true
        }),
    [REGISTERING_PROJECTS_FAILED]: state =>
        Object.assign({}, state, {
            projectsSuccessFullyRegistered: false
        }),
    [REGISTERED_PROJECTS_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            registeredProjects: action.payload.registeredProjects
        }),


};
