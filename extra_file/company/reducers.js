
import {
    COMPANY_SUCCESSFULLY_REGISTERED,
    REGISTERED_COMPANY_FETCHED_SUCCESSFULLY,
    REGISTERING_COMPANY_FAILED
} from "./actionTypes";

export const ACTION_HANDLERS = {

    [COMPANY_SUCCESSFULLY_REGISTERED]: state =>
        Object.assign({}, state, {
            companySuccessFullyRegistered: true
        }),
    [REGISTERING_COMPANY_FAILED]: state =>
        Object.assign({}, state, {
            companySuccessFullyRegistered: false
        }),
    [REGISTERED_COMPANY_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            registeredCompany: action.payload.registeredCompany
        }),


};
