import React, {Component} from 'react';

import Table from "../../components/table/table_body/Table";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {fetchAllAdmin, registerAdmin} from "../../store/modules/admin_sign_up/actions";
import {fetchAllGender} from "../../store/modules/gender_info/actions";
import Select from "react-select";
import {Link} from "react-router-dom";



class SignUp extends Component {

    state = {
        adminFirstName: '',
        adminMiddleName: '',
        adminSurname: '',
        adminPhoneNumber: '',
        adminEmail: '',
        adminNationalId: '',
        encryptedPassword: '',

        selectedOption: '',
        selectOptions: [],

        tableData: [],
        tableHeaders: {
            AdminId:'#',
            AdminFirstName: 'AdminFirstName',
            AdminMiddleName: 'AdminMiddleName',
            AdminSurname: 'AdminSurname',
            AdminPhoneNumber: 'AdminPhoneNumber',
            AdminEmail: 'AdminEmail',
            AdminNationalId: 'AdminNationalId',
            GenderId: 'Gender',
            EncryptedPassword: 'EncryptedPassword'

        }
    };


    componentDidMount() {
        this.props.fetchAllGender();
        this.props.fetchAllAdmin();
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
            AdminFirstName:this.state.adminFirstName,
            AdminMiddleName:this.state.adminMiddleName,
            AdminSurname:this.state.adminSurname,
            AdminPhoneNumber:this.state.adminPhoneNumber,
            AdminEmail:this.state.adminEmail,
            AdminNationalId:this.state.adminNationalId,
            EncryptedPassword:this.state.encryptedPassword,
        };


        this.props.registerAdmin(payload);
        this.setState({
            adminFirstName: '',
            adminMiddleName: '',
            adminSurname: '',
            adminPhoneNumber: '',
            adminEmail: '',
            adminNationalId: '',
            encryptedPassword: ''});

    };

    render() {
        return (
            <>

            <div className="col-md-4 col-md-offset-4">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Admin Registration</h3>
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
                                        name="adminFirstName"
                                        className="form-control"
                                        placeholder="FirstName"
                                        value={this.state.adminFirstName}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                </div>

                                <div className="form-group">

                                    <input
                                        name="adminMiddleName"
                                        className="form-control"
                                        placeholder="MiddleName"
                                        value={this.state.adminMiddleName}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                </div>

                                <div className="form-group">

                                    <input
                                        name="adminSurname"
                                        className="form-control"
                                        placeholder="Surname"
                                        value={this.state.adminSurname}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                </div>

                                <div className="form-group">

                                    <input
                                        name="adminPhoneNumber"
                                        className="form-control"
                                        placeholder="PhoneNumber"
                                        value={this.state.adminPhoneNumber}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                </div>

                                <div className="form-group">

                                    <input
                                        name="adminEmail"
                                        className="form-control"
                                        placeholder="Email"
                                        value={this.state.adminEmail}
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
                                        name="adminNationalId"
                                        className="form-control"
                                        placeholder="National Id"
                                        value={this.state.adminNationalId}
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
                                    <Link to="/registered_admin">View Registered Admin</Link>
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
    registerAdmin: PropTypes.func.isRequired,
    signUpSuccessful: PropTypes.bool.isRequired,
    fetchAllAdmin: PropTypes.func.isRequired,
    registeredAdmin: PropTypes.arrayOf(PropTypes.object).isRequired,
    registeredGender: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllGender: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    signUpSuccessful: state.sign_up.signUpSuccessful,
    registeredAdmin: state.sign_up.registeredAdmin,
    registeredGender: state.gender_info.registeredGender
});



const mapDispatchToProps = dispatch => ({
    registerAdmin: payload => dispatch(registerAdmin(payload)),
    fetchAllAdmin: () => dispatch(fetchAllAdmin()),
    fetchAllGender: () => dispatch(fetchAllGender())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);