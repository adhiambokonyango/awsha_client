import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    authenticateSystemUser,
    resetWrongCredentials,
    authenticateSystemAdmin,
    authenticateOfficeAdmin,

} from "../../store/user_management/user_log_in/actions";
import {fetchAllUserPrivileges} from "../../store/modules/privileges/actions"
import {fetchAllAdminUserPrivileges} from "../../store/modules/admin_privileges/actions";
import {fetchAllAdministratorUserPrivileges} from "../../store/modules/administrator_privileges/actions";
import {promiselessApiGetAll, promiselessApiPost} from "../../services/api_connector/ApiConnector";
import {fetchAllUser} from "../../store/user_management/user_sign_up/actions";
import {registerUserSessionLogs} from "../../store/activity_log/user_session_log/actions";

import "./Login.scss";
class LogIn extends Component {
    state = {
        attemptedEmail: "",
        attemptedPassword: "",
        loginHasError: false,
        loginErrorMessage: "",
        emailReadOnly: false,
        passwordReadOnly: false,
        loginNoError: false,
        userloginNoError: false,
        adminloginNoError: false,



    };

    componentWillUpdate(nextProps, nextState, nextContext) {

        if (this.props.isAdminLoginSuccessful === true){
            this.props.history.push('/awsha_home');
        }

    }

    async componentDidMount() {
        this.setState({ emailReadOnly: false, passwordReadOnly: false });
        this.props.fetchAllUserPrivileges();
        this.props.fetchAllAdminUserPrivileges();
        this.props.fetchAllAdministratorUserPrivileges();
        this.props.fetchAllUser();


    }

    componentDidUpdate(prevProps) {
        let i = 0;

         if (this.props.administratorPrivilege !== prevProps.administratorPrivilege) {
             if (this.props.administratorPrivilege[i].AdministratorPermissionStatus === 1) {
                 this.setState({
                     loginNoError: true
                 })

             }
         }

         if (this.props.isOfficeAdministratorLoginSuccessful !== prevProps.isOfficeAdministratorLoginSuccessful) {
             if (this.props.isOfficeAdministratorLoginSuccessful) {

                 if (this.state.loginNoError === true){
                     this.props.fetchAllAdministratorUserPrivileges();
                     this.props.history.push("/administrator_level");
                 }
             } else if (!this.props.isOfficeAdministratorLoginSuccessful) {
                 this.props.history.push("/teams");
             }
         }

        /* ---------------------------------------------------------------------------------------------------------------------- */

        /*PAGE NAVIGATION LOGIC*/

        if (this.props.adminPrivilege !== prevProps.adminPrivilege) {
            if (this.props.adminPrivilege[i].AdminPermissionStatus === 1) {
                this.setState({
                    adminloginNoError: true
                })

            }
        }

        if (this.props.isAdminLoginSuccessful !== prevProps.isAdminLoginSuccessful) {
            if (this.props.isAdminLoginSuccessful) {

                if (this.state.adminloginNoError === true){
                    this.props.fetchAllAdminUserPrivileges();
                    this.props.history.push("/first_level_admin");
                }
            } else if (!this.props.isAdminLoginSuccessful) {
                this.props.history.push("/admin_page");
            }
        }
         /* ---------------------------------------------------------------------------------------------------------------------- */

         /*PAGE NAVIGATION LOGIC*/

        if (this.props.privilege !== prevProps.privilege) {
            if (this.props.privilege[i].PermissionStatus === 1) {
                this.setState({
                    userloginNoError: true
                })

            }
        }

        if (this.props.isLoginSuccessful !== prevProps.isLoginSuccessful) {
            if (this.props.isLoginSuccessful) {
                if (this.state.userloginNoError === true){
                    this.props.fetchAllUserPrivileges();

                    this.props.history.push("/user_level");
                }
            } else if (!this.props.isLoginSuccessful) {
                this.props.history.push("/user_sign_up");
            }
        }

        /* ---------------------------------------------------------------------------------------------------------------------- */


    };

    handleEmailEditTextsFocus = () => {
        this.setState({ emailReadOnly: false });
    };

    handlePasswordEditTextsFocus = () => {
        this.setState({ passwordReadOnly: false });
    };

    handleSubmit = event => {
        event.preventDefault();
        const payload = {
            AttemptedEmail: this.state.attemptedEmail,
            AttemptedPassword: this.state.attemptedPassword,
            SessionLogId: this.state.userSessionId

        };

        this.props.authenticateSystemUser(payload);
        this.props.authenticateSystemAdmin(payload);
        this.props.authenticateOfficeAdmin(payload);

    };

    handleChange = event => {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState({
            ...newState
        });
    };

    handleAnyTextFieldTouched = () => {
        this.props.resetWrongCredentials();
        this.setState({ loginHasError: false, loginErrorMessage: "" });
    };

    render() {
        return (
            <div>
                <div className="container user-login-card">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="login-panel panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Sign In</h3>
                                </div>
                                <div className="panel-body">
                                    <form
                                        action=""
                                        method="POST"
                                        onSubmit={this.handleSubmit}
                                        encType="multipart/form-data"
                                    >
                                        <fieldset>
                                            <div className="form-group">
                                                <input
                                                    onClick={() => {
                                                        this.handleAnyTextFieldTouched();
                                                    }}
                                                    name="attemptedEmail"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    value={this.state.attemptedEmail}
                                                    type="text"
                                                    onChange={this.handleChange}
                                                    autoFocus
                                                    required={true}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <input
                                                    onClick={() => {
                                                        this.handleAnyTextFieldTouched();

                                                    }}
                                                    name="attemptedPassword"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    value={this.state.attemptedPassword}
                                                    type="password"
                                                    onChange={this.handleChange}
                                                    required={true}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-lg btn-success btn-block"

                                            >
                                                Sign In
                                            </button>
                                            <p
                                                className={
                                                    this.state.loginHasError
                                                        ? "login__error-text"
                                                        : "login__hide"
                                                }
                                            >
                                                {this.state.loginErrorMessage}
                                            </p>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LogIn.propTypes = {
    authenticateSystemUser: PropTypes.func.isRequired,
    resetWrongCredentials: PropTypes.func.isRequired,
    hasWrongLoginCredentials: PropTypes.bool.isRequired,
    accessDenied:PropTypes.bool.isRequired,
    isLoginSuccessful:PropTypes.bool.isRequired,
    isAdminLoginSuccessful:PropTypes.bool.isRequired,
    isOfficeAdministratorLoginSuccessful:PropTypes.bool.isRequired,
    sessionLogRegisterSuccessful: PropTypes.bool.isRequired,
    authenticateSystemAdmin: PropTypes.func.isRequired,
    fetchAllUserPrivileges: PropTypes.func.isRequired,
    authenticateOfficeAdmin: PropTypes.func.isRequired,
    privilege: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllAdminUserPrivileges: PropTypes.func.isRequired,
    adminPrivilege: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllAdministratorUserPrivileges: PropTypes.func.isRequired,
    administratorPrivilege: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllUser: PropTypes.func.isRequired,
    session_details: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
    hasWrongLoginCredentials: state.user_log_in.hasWrongLoginCredentials,
    accessDenied: state.user_log_in.accessDenied,
    isLoginSuccessful: state.user_log_in.isLoginSuccessful,
    isAdminLoginSuccessful: state.user_log_in.isAdminLoginSuccessful,
    isOfficeAdministratorLoginSuccessful: state.user_log_in.isOfficeAdministratorLoginSuccessful,
    privilege: state.privileges.privilege,
    adminPrivilege: state.admin_privileges.adminPrivilege,
    administratorPrivilege: state.administrator_privileges.administratorPrivilege,
    registeredUser: state.user_sign_up.registeredUser,
    session_details: state.user_log_in.session_details

});

const mapDispatchToProps = dispatch => ({
    authenticateSystemUser: payload => dispatch(authenticateSystemUser(payload)),
    resetWrongCredentials: payload => dispatch(resetWrongCredentials(payload)),
    authenticateSystemAdmin: payload => dispatch(authenticateSystemAdmin(payload)),
    authenticateOfficeAdmin: payload => dispatch(authenticateOfficeAdmin(payload)),
    fetchAllUserPrivileges: () => dispatch(fetchAllUserPrivileges()),
    fetchAllAdminUserPrivileges: () => dispatch(fetchAllAdminUserPrivileges()),
    fetchAllAdministratorUserPrivileges: () => dispatch(fetchAllAdministratorUserPrivileges()),
    fetchAllUser: () => dispatch(fetchAllUser()),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogIn);