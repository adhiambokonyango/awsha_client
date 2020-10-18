import React, {Component} from 'react';

import Table from "../../components/table/table_body/Table";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {fetchAllAdmin, registerAdmin} from "../../store/user_management/admin_sign_up/actions";
import {fetchAllGender} from "../../store/modules/gender_info/actions";
import Select from "react-select";
import {Link} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import NavigationBar from "../admin_page/nav_bar/NavigationBar";
import {FaCogs} from "react-icons/fa";
import '../projects/Projects.css'
import ProjectDetail from "../projects/ProjectDetail";



class AdminSignUp extends Component {

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
            AdminId:'#',
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

    // componentWillMount() {
    //     if (this.props.isAdminLoginSuccessful === false){
    //         this.props.history.push('/');
    //     }
    // }
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

            FirstName:this.state.firstName,
            MiddleName:this.state.middleName,
            Surname:this.state.surname,
            PhoneNumber:this.state.phoneNumber,
            Email:this.state.email,
            NationalId:this.state.nationalId,
            EncryptedPassword:this.state.encryptedPassword,
        };


        this.props.registerAdmin(payload);
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
        const projectTitle = (
            <ul>
                {this.props.registeredAdmin.map((post) =>
                    <a >
                        <h6>
                            <ul key={post.Id} >
                                {"  "}<FaCogs/>{" "}{post.FirstName}
                            </ul></h6>
                    </a>
                )}
            </ul>
        );

        return (<div>{projectTitle}</div>);
    }


    render() {

        return (
            <div>
                <NavigationBar/>
                <Container>
                    <div className="card">
                        <div className="card-content">
                            <Row>
            {/*<div className="col-md-4 col-md-offset-4">*/}
            {/*    <div className="login-panel panel panel-default">*/}
            {/*        <div className="panel-heading">*/}
            {/*            <h3 className="panel-title">System Admin Registration</h3>*/}
                <Col sm={12} md={4} lg={6}>
                    <h3 className="title titles">System Admin</h3>
                    <h3 className="panel-title subs">Register System Admin</h3>
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
                                <Col sm={12} md={4} lg={6} className="array listed_projects">
                                    <h3 className="panel-title card_header">Registered System Admin</h3>
                                    <div className="vertical_scroll">
                                        <div className="scrollmenu">
                                            <ul >
                                                {this.blog()}
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}


AdminSignUp.propTypes = {
    registerAdmin: PropTypes.func.isRequired,
    signUpSuccessful: PropTypes.bool.isRequired,
    fetchAllAdmin: PropTypes.func.isRequired,
    registeredAdmin: PropTypes.arrayOf(PropTypes.object).isRequired,
    registeredGender: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllGender: PropTypes.func.isRequired,
    isAdminLoginSuccessful:PropTypes.bool.isRequired,

};


const mapStateToProps = state => ({
    signUpSuccessful: state.admin_sign_up.signUpSuccessful,
    registeredAdmin: state.admin_sign_up.registeredAdmin,
    registeredGender: state.gender_info.registeredGender,
    isAdminLoginSuccessful: state.user_log_in.isAdminLoginSuccessful,
});



const mapDispatchToProps = dispatch => ({
    registerAdmin: payload => dispatch(registerAdmin(payload)),
    fetchAllAdmin: () => dispatch(fetchAllAdmin()),
    fetchAllGender: () => dispatch(fetchAllGender())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminSignUp);