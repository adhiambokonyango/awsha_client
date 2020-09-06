import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    ERROR_REGISTERING_USER_SESSION_LOG,
    USER_SESSION_LOG_EMPTY_FETCH,
    USER_SESSION_LOG_FETCH_ERROR,
    USER_SESSION_LOG_FETCH_SUCCESSFULLY,
    USER_SESSION_LOG_REGISTERED_SUCCESSFULLY
} from './actionTypes'

export function registerUserSessionLogs(payload) {
    return async dispatch => {
        const apiRoute = "/add_actual_session_activities";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: USER_SESSION_LOG_REGISTERED_SUCCESSFULLY
                    });
                } else {
                    dispatch({
                        type: ERROR_REGISTERING_USER_SESSION_LOG
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}


export function fetchAllUserSessionLogs() {
    return async dispatch => {
        const apiRoute = "/get_all_session_logs";
        const returnedPromise = apiGetAll(apiRoute);

        returnedPromise.then(
            function (result) {
                if(result.data.results && result.date.results.length > 0){
                    dispatch({
                        type: USER_SESSION_LOG_FETCH_SUCCESSFULLY,
                        payload: {
                            registeredSessionLogs: result.data.results
                        }
                    })
                } else if(result.data.results && result.data.results === 0){
                    dispatch({
                        type: USER_SESSION_LOG_EMPTY_FETCH
                    })
                }
            },
            function (err) {
                dispatch({
                    type: USER_SESSION_LOG_FETCH_ERROR
                })
                console.log(err);
            }
        )
    }

}