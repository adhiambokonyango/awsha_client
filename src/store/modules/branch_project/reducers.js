import {
    BRANCH_PROJECT_FETCHED_SUCCESSFULLY,
    BRANCH_PROJECT_STATUS_SUCCESSFULLY_UPDATED,


} from "./actionTypes";

export const ACTION_HANDLERS = {

    [BRANCH_PROJECT_STATUS_SUCCESSFULLY_UPDATED]: state =>
        Object.assign({}, state, {
            projectStatusSuccessFullyUpdated: true
        }),


    [BRANCH_PROJECT_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            branch: action.payload.branch
        }),

};