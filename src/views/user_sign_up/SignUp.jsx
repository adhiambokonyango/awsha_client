import React, {Component} from 'react';

import Table from "../../components/table/table_body/Table";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {fetchAllUser, registerUser} from "../../store/user_management/user_sign_up/actions";
import {fetchAllGender} from "../../store/modules/gender_info/actions";
import Select from "react-select";
import {Link} from "react-router-dom";



class SignUp extends Component {

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

        }
    };


    componentDidMount() {
        this.props.fetchAllGender();
        this.props.fetchAllUser();
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
    };



    handleChange = event => {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState({
            ...newState
        });
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


        this.props.registerUser(payload);
        this.setState({
            firstName: '',
            middleName: '',
            surname: '',
            phoneNumber: '',
            email: '',
            nationalId: '',
            password: ''});

    };

    render() {
        return (
            <>

            <div className="col-md-4 col-md-offset-4">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">User Registration</h3>
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

                                <button
                                    type="btn-link"
                                    className="btn btn-lg btn-success btn-block"
                                >
                                    <Link to="/registered_users">View Registered User</Link>
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>

            </>
        );
    }
}


SignUp.propTypes = {
    registerUser: PropTypes.func.isRequired,
    signUpSuccessful: PropTypes.bool.isRequired,
    fetchAllUser: PropTypes.func.isRequired,
    registeredUser: PropTypes.arrayOf(PropTypes.object).isRequired,
    registeredGender: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllGender: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    signUpSuccessful: state.user_sign_up.signUpSuccessful,
    registeredUser: state.user_sign_up.registeredUser,
    registeredGender: state.gender_info.registeredGender
});



const mapDispatchToProps = dispatch => ({
    registerUser: payload => dispatch(registerUser(payload)),
    fetchAllUser: () => dispatch(fetchAllUser()),
    fetchAllGender: () => dispatch(fetchAllGender())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);