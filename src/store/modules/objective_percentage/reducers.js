
import {
    OBJECTIVE_PERCENTAGE_SUCCESSFULLY_REGISTERED,
    REGISTERING_OBJECTIVE_PERCENTAGE_FAILED,

    REGISTERED_OBJECTIVE_PERCENTAGE_FETCHED_SUCCESSFULLY,


    CONFIRM_DONE_OBJECTIVE_SUCCESSFUL,

} from "./actionTypes";

export const ACTION_HANDLERS = {

    [OBJECTIVE_PERCENTAGE_SUCCESSFULLY_REGISTERED]: state =>
        Object.assign({}, state, {
            objectivePercentageSuccessFullyRegistered: true
        }),
    [REGISTERING_OBJECTIVE_PERCENTAGE_FAILED]: state =>
        Object.assign({}, state, {
            objectivePercentageSuccessFullyRegistered: false
        }),
    [REGISTERED_OBJECTIVE_PERCENTAGE_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            registeredObjectivePercentage: action.payload.registeredObjectivePercentage
        }),
    [CONFIRM_DONE_OBJECTIVE_SUCCESSFUL]: (state, action) =>
        Object.assign({}, state, {
            sumObjectivePercentage: action.payload.sumObjectivePercentage
        }),


};
