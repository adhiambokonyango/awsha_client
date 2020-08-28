import {apiGetAll, apiPost} from "../../../services/api_connector/ApiConnector";
import {
    ERROR_REGISTERING_SESSION_LOG, SESSION_LOG_EMPTY_FETCH, SESSION_LOG_FETCH_ERROR,
    SESSION_LOG_FETCH_SUCCESSFULLY,
    SESSION_LOG_REGISTERED_SUCCESSFULLY
} from './actionTypes'

export function registerSessionLogs(payload) {
    return async dispatch => {
        const apiRoute = "/add_session_logs";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: SESSION_LOG_REGISTERED_SUCCESSFULLY
                    });
                } else {
                    dispatch({
                        type: ERROR_REGISTERING_SESSION_LOG
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}


export function fetchAllSessionLogs() {
    return async dispatch => {
        const apiRoute = "/get_all_session_logs";
        const returnedPromise = apiGetAll(apiRoute);

        returnedPromise.then(
            function (result) {
                if(result.data.results && result.date.results.length > 0){
                    dispatch({
                        type: SESSION_LOG_FETCH_SUCCESSFULLY,
                        payload: {
                            registeredSessionLogs: result.data.results
                        }
                    })
                } else if(result.data.results && result.data.results === 0){
                    dispatch({
                        type: SESSION_LOG_EMPTY_FETCH
                    })
                }
            },
            function (err) {
                dispatch({
                    type: SESSION_LOG_FETCH_ERROR
                })
                console.log(err);
            }
        )
    }

}