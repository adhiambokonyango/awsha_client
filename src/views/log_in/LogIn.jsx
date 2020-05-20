import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    authenticateSystemUser,
    resetWrongCredentials
} from "../../store/modules/log_in/actions";
import { FormGroup, Label, Input } from "reactstrap";


import "./Login.scss";
class LogIn extends Component {
    state = {
        attemptedEmail: "",
        attemptedPassword: "",
        loginHasError: false,
        loginErrorMessage: "",
        emailReadOnly: false,
        passwordReadOnly: false
    };

    componentDidMount() {
        this.setState({ emailReadOnly: false, passwordReadOnly: false });
    }

    componentDidUpdate(prevProps) {
        /* ---------------------------------------------------------------------------------------------------------------------- */

        /*PAGE NAVIGATION LOGIC*/
        if (this.props.isLoginSuccessful !== prevProps.isLoginSuccessful) {
            if (this.props.isLoginSuccessful) {
                this.props.history.push("/company");
            } else if (!this.props.isLoginSuccessful) {
                this.props.history.push("/");
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
            AttemptedPassword: this.state.attemptedPassword
        };


            this.props.authenticateSystemUser(payload);

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



};

const mapStateToProps = state => ({
    hasWrongLoginCredentials: state.log_in.hasWrongLoginCredentials,
    isLoginSuccessful: state.log_in.isLoginSuccessful

});

const mapDispatchToProps = dispatch => ({
    authenticateSystemUser: payload => dispatch(authenticateSystemUser(payload)),
    resetWrongCredentials: payload => dispatch(resetWrongCredentials(payload)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogIn);