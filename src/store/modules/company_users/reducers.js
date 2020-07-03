
import {
    COMPANY_USER_SUCCESSFULLY_REGISTERED,
    REGISTERED_COMPANY_USER_FETCHED_SUCCESSFULLY,
    REGISTERING_COMPANY_USER_FAILED
} from "./actionTypes";

export const ACTION_HANDLERS = {

    [COMPANY_USER_SUCCESSFULLY_REGISTERED]: state =>
        Object.assign({}, state, {
            companyUserSuccessFullyRegistered: true
        }),
    [REGISTERING_COMPANY_USER_FAILED]: state =>
        Object.assign({}, state, {
            companyUserSuccessFullyRegistered: false
        }),
    [REGISTERED_COMPANY_USER_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            registeredCompanyUser: action.payload.registeredCompanyUser
        }),


};
