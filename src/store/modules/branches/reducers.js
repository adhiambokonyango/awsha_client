import {FETCH_ALL_BRANCHES_SUCCESS} from "./actionTypes";

export const ACTION_HANDLERS = {
    [FETCH_ALL_BRANCHES_SUCCESS]: (state, action) =>
    Object.assign({}, state, {
        branch: action.payload.branch
     })

}