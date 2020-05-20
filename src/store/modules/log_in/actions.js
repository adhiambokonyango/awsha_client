import {
    STORE_USER,
    BEGIN_USER_AUTHENTIFICATION,

    USER_LOGIN_SUCCESS,
    AN_ERROR_OCCURED_DURING_LOGIN,
    RESET_WRONG_CREDENTIALS,
    WRONG_LOGIN_CREDENTIALS


} from "./actionTypes";
import {
    apiGetAll,
    apiPost
} from "../../../services/api_connector/ApiConnector";

export function resetWrongCredentials() {
    return async dispatch => {
        dispatch({
            type: RESET_WRONG_CREDENTIALS
        });
    };
}

export function authenticateSystemUser(payload) {
    return async dispatch => {
        dispatch({
            type: BEGIN_USER_AUTHENTIFICATION
        });
        const apiRoute = "/admin_login";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (!result.data.error) {
                    dispatch({
                        type: STORE_USER,
                        payload: {
                            session_details: result.data,
                            // RoleType: REGULAR_SYSTEM_USER,
                            isSessionActive: true
                        }
                    });
                    dispatch({
                        type: USER_LOGIN_SUCCESS
                    });


                } else {
                    dispatch({
                        type: WRONG_LOGIN_CREDENTIALS
                    });
                }
            },
            function(err) {
                dispatch({
                    type: AN_ERROR_OCCURED_DURING_LOGIN
                });
                console.log(err);
            }
        );
    };
}