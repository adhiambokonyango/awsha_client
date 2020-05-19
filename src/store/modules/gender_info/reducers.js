
import {
    GENDER_SUCCESSFULLY_REGISTERED,
    REGISTERED_GENDER_FETCHED_SUCCESSFULLY,
    REGISTERING_GENDER_FAILED
} from "./actionTypes";

export const ACTION_HANDLERS = {

    [GENDER_SUCCESSFULLY_REGISTERED]: state =>
        Object.assign({}, state, {
            genderSuccessFullyRegistered: true
        }),
    [REGISTERING_GENDER_FAILED]: state =>
        Object.assign({}, state, {
            genderSuccessFullyRegistered: false
        }),
    [REGISTERED_GENDER_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            registeredGender: action.payload.registeredGender
        }),


};
