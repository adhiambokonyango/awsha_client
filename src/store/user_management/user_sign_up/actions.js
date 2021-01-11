
import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    SIGN_UP_SUCCESSFUL,
    SIGN_UP_FAILED,
    REGISTERED_USER_FETCHED_SUCCESSFULLY,
    ERROR_FETCHING_USER,
    REGISTERED_USER_EMPTY_RESULTS, SET_USER,
    RECORDS_FETCHED_SUCCESSFULLY,
    RECORDS_FETCH_EMPTY_RESULTS,
    ERROR_FETCHING_RECORDS
} from "./actionTypes";
import {page, limit} from "../../../views/user_sign_up/Paginate";

export function registerUser(payload) {
    return async dispatch => {
        const apiRoute = "/user_registration";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: SIGN_UP_SUCCESSFUL
                    });
                } else {
                    dispatch({
                        type: SIGN_UP_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}




export function fetchAllUser(pages, limits) {
    return async dispatch => {
       pages = page;
       limits = limit;
        const apiRoute = `/get_all_users/${page}/${limit }`;

        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: REGISTERED_USER_FETCHED_SUCCESSFULLY,
                        payload: {
                            registeredUser: result.data.results
                        }
                    });
                    console.log("aPage: " + page);
                    console.log( "aLimit: " + limit);
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_USER_EMPTY_RESULTS
                    });
                    console.log("aPage: " + page);
                    console.log( "aLimit: " + limit);
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_USER
                });
                console.log(err);
            }
        );
    };
}

export function setUser(userSelect){
    return async dispatch => {
        dispatch({
            type: SET_USER,
            payload: {
                userSelect: userSelect
            }
        });
    };
}

// get all records
export function fetchAllUserRecords() {
    return async dispatch => {
        const apiRoute = "/get_number_of_user_records";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: RECORDS_FETCHED_SUCCESSFULLY,
                        payload: {
                            userRecords: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: RECORDS_FETCH_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_RECORDS
                });
                console.log(err);
            }
        );
    };
}
