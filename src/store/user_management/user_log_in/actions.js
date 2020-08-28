import {
    STORE_USER,
    BEGIN_USER_AUTHENTIFICATION,

    USER_LOGIN_SUCCESS,
    AN_ERROR_OCCURED_DURING_LOGIN,
    RESET_WRONG_CREDENTIALS,
    WRONG_LOGIN_CREDENTIALS,
    STORE_ADMIN,
    STORE_OFFICE_ADMINISTRATOR, AN_ERROR_OCCURED_DURING_LOGOUT, LOGOUT

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
        const apiRoute = "/login";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (!result.data.error) {
                    dispatch({
                        type: STORE_USER,
                        payload: {
                            isLoginSuccessful:false,
                            session_details: result.data,
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

export function authenticateSystemAdmin(payload) {
    return async dispatch => {
        dispatch({
            type: BEGIN_USER_AUTHENTIFICATION
        });
        const apiRoute = "/system_admin_login";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (!result.data.error) {
                    dispatch({
                        type: STORE_ADMIN,
                        payload: {
                            isAdminLoginSuccessful:false,
                            session_details: result.data,
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

export function authenticateOfficeAdmin(payload) {
    return async dispatch => {
        dispatch({
            type: BEGIN_USER_AUTHENTIFICATION
        });
        const apiRoute = "/office_admin_login";
        const returnedPromise = apiPost(payload, apiRoute);
        returnedPromise.then(
            function(result) {
                if (!result.data.error) {
                    dispatch({
                        type: STORE_OFFICE_ADMINISTRATOR,
                        payload: {
                            isOfficeAdministratorLoginSuccessful:false,

                            session_details: result.data,
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

export function logout() {
    return async dispatch => {
        const apiRoute = "/logout";
        const returnedPromise = apiPost(apiRoute);
        returnedPromise.then(
            function (result) {
                if (!result.data.error){
                    dispatch({
                        type: LOGOUT
                    })
                }

            },
            function(err) {
                dispatch({
                    type: AN_ERROR_OCCURED_DURING_LOGOUT
                });
                console.log(err);
            }
        )
    }

}