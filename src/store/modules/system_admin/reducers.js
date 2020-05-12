
import {
    SYSTEM_ADMIN_SUCCESSFULLY_REGISTERED,
    REGISTERED_SYSTEM_ADMIN_FETCHED_SUCCESSFULLY,
    REGISTERING_SYSTEM_ADMIN_FAILED
} from "./actionTypes";

export const ACTION_HANDLERS = {

    [SYSTEM_ADMIN_SUCCESSFULLY_REGISTERED]: state =>
        Object.assign({}, state, {
            systemAdminSuccessFullyRegistered: true
        }),
    [REGISTERING_SYSTEM_ADMIN_FAILED]: state =>
        Object.assign({}, state, {
            systemAdminSuccessFullyRegistered: false
        }),
    [REGISTERED_SYSTEM_ADMIN_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            registeredSystemAdmin: action.payload.registeredSystemAdmin
        }),


};
