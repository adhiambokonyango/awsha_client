import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {fetchAllAdministrator, registerAdministrator} from "../../store/user_management/administrator_sign_up/actions";
import {fetchAllGender} from "../../store/modules/gender_info/actions";
import Select from "react-select";
import {Link} from "react-router-dom";
import {FaCogs} from "react-icons/fa";
import NavigationBar from "../admin_page/nav_bar/NavigationBar";
import {Col, Row} from "react-bootstrap";
import {setUser} from "../../store/user_management/user_sign_up/actions";

class AdministratorSignUp extends Component {

    state = {
        firstName: '',
        middleName: '',
        surname: '',
        phoneNumber: '',
        email: '',
        nationalId: '',
        encryptedPassword: '',

        selectedOption: '',
        selectOptions: [],

        tableData: [],
        tableHeaders: {
            UserId:'#',
            FirstName: 'FirstName',
            MiddleName: 'MiddleName',
            Surname: 'Surname',
            PhoneNumber: 'PhoneNumber',
            Email: 'Email',
            NationalId: 'NationalId',
            GenderId: 'Gender',
            EncryptedPassword: 'EncryptedPassword'

        },
        // check system admin permission status
        userRegistrationPermissionStatus: false,
        loginErrorMessage:"",
    };
    componentWillMount() {
        if (this.props.isAdminLoginSuccessful === false){
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        this.props.fetchAllGender();
        this.props.fetchAllAdministrator();
    }

    componentDidUpdate(prevProps) {
        if(this.props.registeredGender !== prevProps.registeredGender) {
            if(this.props.registeredGender.length > 0) {
                let allregisteredGender = this.props.registeredGender;

                allregisteredGender = allregisteredGender.map(item => {
                    return {
                        label: item.GenderTitle,
                        value: item.GenderId
                    };
                });
                this.setState({ selectOptions: allregisteredGender });
            }
        }

        if (this.props.adminPrivilege !== prevProps.adminPrivilege) {
            if (this.props.adminPrivilege[0].AdminPermissionStatus === 1) {
                this.setState({
                    userRegistrationPermissionStatus: true
                })

            } else if (this.props.adminPrivilege[0].AdminPermissionStatus === 0){
                this.setState({
                    userRegistrationPermissionStatus: false
                })
            }
        }
    };

    handleAnyTextFieldTouched = () => {
        this.props.resetWrongCredentials();
        this.setState({ loginErrorMessage: "Access denied!" });
    };

    handleChange = event => {
        if(this.state.userRegistrationPermissionStatus === true){
            let newState = this.state;
            newState[event.target.name] = event.target.value;
            this.setState({
                ...newState
            });
        } else if(this.state.userRegistrationPermissionStatus === false){
            this.handleAnyTextFieldTouched();
        }
    };

    handleSubmit = (e) =>{
        e.preventDefault();

        const payload = {
            GenderId:this.state.selectedOption.value,

            FirstName:this.state.firstName,
            MiddleName:this.state.middleName,
            Surname:this.state.surname,
            PhoneNumber:this.state.phoneNumber,
            Email:this.state.email,
            NationalId:this.state.nationalId,
            EncryptedPassword:this.state.encryptedPassword,
        };


        this.props.registerAdministrator(payload);
        this.setState({
            firstName: '',
            middleName: '',
            surname: '',
            phoneNumber: '',
            email: '',
            nationalId: '',
            password: ''});

    };

    blog = () => {
        const user = (
            <ul>
                {this.props.registeredAdministrator.map((post) =>
                    <a onClick={() => {this.selected(post)}}>
                        <h6>
                            <ul key={post.id} >
                                {"  "}<FaCogs/>{" "}{post.FirstName}
                            </ul></h6>
                    </a>
                )}
            </ul>
        );
        return (<div>{user}</div>);
    }
    selected = (userSelect) => {
        this.props.setUser(userSelect);
        this.props.history.push('/administrator_profile');
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                {/*<div className="col-md-4 col-md-offset-4">*/}
                <Row>
                    <div className="login-panel panel panel-default">
                        {/*    <div className="panel-heading">*/}
                        {/*        <h3 className="panel-title">User Registration</h3>*/}
                        {/*    </div>*/}
                        <Col sm={5}>
                            <h3 className="title titles">Administrator</h3>
                            <h3 className="panel-title subs">Register Administrator</h3>
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
                                        name="firstName"
                                        className="form-control"
                                        placeholder="FirstName"
                                        value={this.state.firstName}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                </div>

                                <div className="form-group">

                                    <input
                                        name="middleName"
                                        className="form-control"
                                        placeholder="MiddleName"
                                        value={this.state.middleName}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                </div>

                                <div className="form-group">

                                    <input
                                        name="surname"
                                        className="form-control"
                                        placeholder="Surname"
                                        value={this.state.surname}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                </div>

                                <div className="form-group">

                                    <input
                                        name="phoneNumber"
                                        className="form-control"
                                        placeholder="PhoneNumber"
                                        value={this.state.phoneNumber}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                </div>

                                <div className="form-group">

                                    <input
                                        name="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={this.state.email}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                </div>

                                <div className="form-group">
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        placeholder="Select Gender"
                                        name="selectedOption"
                                        closeMenuOnSelect={true}
                                        value={this.state.selectedOption}
                                        onChange={value =>
                                            this.setState({
                                                ...this.state,
                                                selectedOption: value
                                            })
                                        }
                                        options={this.state.selectOptions}
                                    />
                                </div>


                                <div className="form-group">

                                    <input
                                        name="nationalId"
                                        className="form-control"
                                        placeholder="National Id"
                                        value={this.state.nationalId}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                </div>

                                <div className="form-group">

                                    <input
                                        name="encryptedPassword"
                                        className="form-control"
                                        placeholder="Password"
                                        value={this.state.encryptedPassword}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                </div>



                                <button
                                    type="submit"
                                    className="btn btn-lg btn-success btn-block"
                                >
                                    Submit
                                </button>
                            </fieldset>
                        </form>
                    </div>
                        </Col>
                        <Col sm={12} md={4} lg={4} className="listed_projects">
                            <div className="card">
                                <div className="card-content">
                                    <h3 className="panel-title card_header">Registered Administrators</h3>
                                    <div className="vertical_scroll">
                                        <div className="scrollmenu">
                                            <ul >
                                                {this.blog()}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </div>
                </Row>
            </div>
        );
    }
}


AdministratorSignUp.propTypes = {
    registerAdministrator: PropTypes.func.isRequired,
    signUpSuccessful: PropTypes.bool.isRequired,
    fetchAllAdministrator: PropTypes.func.isRequired,
    registeredAdministrator: PropTypes.arrayOf(PropTypes.object).isRequired,
    registeredGender: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllGender: PropTypes.func.isRequired,
    isAdminLoginSuccessful:PropTypes.bool.isRequired,
    setUser: PropTypes.func.isRequired,
    userSelect: PropTypes.object.isRequired,

};


const mapStateToProps = state => ({
    signUpSuccessful: state.administrator_sign_up.signUpSuccessful,
    registeredAdministrator: state.administrator_sign_up.registeredAdministrator,
    registeredGender: state.gender_info.registeredGender,
    isAdminLoginSuccessful: state.user_log_in.isAdminLoginSuccessful,
    serSelect: state.user_sign_up.userSelect,
});



const mapDispatchToProps = dispatch => ({
    registerAdministrator: payload => dispatch(registerAdministrator(payload)),
    fetchAllAdministrator: () => dispatch(fetchAllAdministrator()),
    fetchAllGender: () => dispatch(fetchAllGender()),
    setUser: payload => dispatch(setUser(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdministratorSignUp);