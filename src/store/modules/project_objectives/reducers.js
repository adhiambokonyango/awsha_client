
import {
    PROJECT_OBJECTIVES_SUCCESSFULLY_REGISTERED,
    REGISTERED_PROJECT_OBJECTIVES_FETCHED_SUCCESSFULLY,
    REGISTERING_PROJECT_OBJECTIVES_FAILED
} from "./actionTypes";

export const ACTION_HANDLERS = {

    [PROJECT_OBJECTIVES_SUCCESSFULLY_REGISTERED]: state =>
        Object.assign({}, state, {
            projectObjectivesSuccessFullyRegistered: true
        }),
    [REGISTERING_PROJECT_OBJECTIVES_FAILED]: state =>
        Object.assign({}, state, {
            projectObjectivesSuccessFullyRegistered: false
        }),
    [REGISTERED_PROJECT_OBJECTIVES_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            registeredProjectObjectives: action.payload.registeredProjectObjectives
        }),


};
