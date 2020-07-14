import {
    CONFIRMATION_STATUS_FETCHED_SUCCESSFULLY

} from "./actionTypes";


export const ACTION_HANDLERS = {



    [CONFIRMATION_STATUS_FETCHED_SUCCESSFULLY]: (state, action) =>
        Object.assign({}, state, {
            confirmationStatus: action.payload.confirmationStatus
        }),


};