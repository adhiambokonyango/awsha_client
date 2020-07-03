
import {
    OBJECTIVES_SUCCESSFULLY_REGISTERED,
    REGISTERED_OBJECTIVES_FETCHED_SUCCESSFULLY,
    REGISTERING_OBJECTIVES_FAILED
} from "./actionTypes";

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


};
