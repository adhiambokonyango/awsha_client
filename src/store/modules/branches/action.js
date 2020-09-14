import {apiGetAll} from "../../../services/api_connector/ApiConnector";
import {BRANCH_EMPTY_FETCH, FETCH_ALL_BRANCHES_SUCCESS, FETCH_FAIL} from "./actionTypes";

export function fetchAllBranches(){
    return async dispatch => {
        const apiRoute = "/get_all_branch";
        const returnedPromise = apiGetAll(apiRoute);

        returnedPromise.then(
            function (result){
                if (result.data.results && result.data.results.length > 0){
                    dispatch({
                        type: FETCH_ALL_BRANCHES_SUCCESS,
                        payload: {
                            branch: result.data.results
                        }
                    })
                } else if (result.data.results && result.data.results.length === 0){
                    dispatch({
                        type: BRANCH_EMPTY_FETCH
                    })
                }
            }, function(err) {
                dispatch({
                    type: FETCH_FAIL
                });
                console.log(err);
            }
        )
    }
}