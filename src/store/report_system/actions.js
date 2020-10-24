import {apiPost} from "../../services/api_connector/ApiConnector";
import {OBJECTIVES_SUCCESSFULLY_REGISTERED, REGISTERING_OBJECTIVES_FAILED} from "../modules/objectives/actionTypes";

export function createReport(payload) {
    return async dispatch => {
        const apiRoute = "/create-pdf";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (result.data.results.success) {
                    dispatch({
                        type: OBJECTIVES_SUCCESSFULLY_REGISTERED
                    });
                } else {
                    dispatch({
                        type: REGISTERING_OBJECTIVES_FAILED
                    });
                }
            },
            function(err) {
                console.log(err);
            }
        );
    };
}