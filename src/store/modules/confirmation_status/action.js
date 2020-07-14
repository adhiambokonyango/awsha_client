// fetch confirmation status for log in
import {apiGetAll} from "../../../services/api_connector/ApiConnector";
import {
    CONFIRMATION_STATUS_FETCHED_SUCCESSFULLY, ERROR_FETCHING_CONFIRMATION_STATUS,
    REGISTERED_CONFIRMATION_STATUS_EMPTY_RESULTS
} from "./actionTypes";

export function getConfirmationStatus() {
    return async dispatch => {
        const apiRoute = "/get_all_user_id_and_permission_status";
        const returnedPromise = apiGetAll(apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results && result.data.results.length > 0) {
                    dispatch({
                        type: CONFIRMATION_STATUS_FETCHED_SUCCESSFULLY,
                        payload: {
                            confirmationStatus: result.data.results
                        }
                    });
                } else if (result.data.results && result.data.results.length === 0) {
                    dispatch({
                        type: REGISTERED_CONFIRMATION_STATUS_EMPTY_RESULTS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: ERROR_FETCHING_CONFIRMATION_STATUS
                });
                console.log("this confirmation status",err);
            }
        );
    };

}
