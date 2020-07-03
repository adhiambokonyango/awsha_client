import React, {Component} from 'react';
import {fetchAllCompany} from "../../src/store/modules/company/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerTeamMember} from "../team_member_signup/actions";
import {fetchAllGender} from "../../src/store/modules/gender_info/actions";
import Select from "react-select";
import {Link} from "react-router-dom";
import { fetchAllTeams} from "../../src/store/modules/teams/actions";



class TeamMemberSignUp extends Component {

    state = {
        teamMemberName: '',
        teamMemberEmail: '',
        teamMemberNationalId: '',
        encryptedPassword: '',

        selectedOptionThree: '',
        selectOptionsThree: [],

        selectedOptionOne: '',
        selectOptionsOne: [],

        selectedOptionTwo: '',
        selectOptionsTwo: [],


    };


    componentDidMount() {
        this.props.fetchAllGender();
        this.props.fetchAllCompany();
        this.props.fetchAllTeams();
    }

    componentDidUpdate(prevProps) {
        if(this.props.registeredCompany !== prevProps.registeredCompany) {
            if(this.props.registeredCompany.length > 0) {
                let allregisteredCompany = this.props.registeredCompany;

                allregisteredCompany = allregisteredCompany.map(item => {
                    return {
                        label: item.CompanyName,
                        value: item.CompanyId
                    };
                });
                this.setState({ selectOptionsThree: allregisteredCompany });
            }
        }

        if(this.props.registeredTeams !== prevProps.registeredTeams) {
            if(this.props.registeredTeams.length > 0) {
                let allregisteredTeams = this.props.registeredTeams;

                allregisteredTeams = allregisteredTeams.map(item => {
                    return {
                        label: item.TeamName,
                        value: item.TeamId
                    };
                });
                this.setState({ selectOptionsOne: allregisteredTeams });
            }
        }


        if(this.props.registeredGender !== prevProps.registeredGender) {
            if(this.props.registeredGender.length > 0) {
                let allregisteredGender = this.props.registeredGender;

                allregisteredGender = allregisteredGender.map(item => {
                    return {
                        label: item.GenderTitle,
                        value: item.GenderId
                    };
                });
                this.setState({ selectOptionsTwo: allregisteredGender });
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
            GenderId:this.state.selectedOptionTwo.value,
            TeamId:this.state.selectedOptionOne.value,
            CompanyId:this.state.selectedOptionThree.value,

            TeamMemberName:this.state.teamMemberName,
            TeamMemberEmail:this.state.teamMemberEmail,
            TeamMemberNationalId:this.state.teamMemberNationalId,
            EncryptedPassword:this.state.encryptedPassword,
        };


        this.props.registerTeamMember(payload);
        this.setState({
            teamMemberName: '',
            teamMemberEmail: '',
            teamMemberNationalId: '',
            encryptedPassword: '',});

    };

    render() {
        return (
            <>

                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Employee Registration</h3>
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
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            placeholder="Select Company"
                                            name="selectedOptionThree"
                                            closeMenuOnSelect={true}
                                            value={this.state.selectedOptionThree}
                                            onChange={value =>
                                                this.setState({
                                                    ...this.state,
                                                    selectedOptionThree: value
                                                })
                                            }
                                            options={this.state.selectOptionsThree}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            placeholder="Select Team"
                                            name="selectedOption"
                                            closeMenuOnSelect={true}
                                            value={this.state.selectedOptionOne}
                                            onChange={value =>
                                                this.setState({
                                                    ...this.state,
                                                    selectedOptionOne: value
                                                })
                                            }
                                            options={this.state.selectOptionsOne}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            placeholder="Select Gender"
                                            name="selectedOption"
                                            closeMenuOnSelect={true}
                                            value={this.state.selectedOptionTwo}
                                            onChange={value =>
                                                this.setState({
                                                    ...this.state,
                                                    selectedOptionTwo: value
                                                })
                                            }
                                            options={this.state.selectOptionsTwo}
                                        />
                                    </div>

                                    <div className="form-group">

                                        <input
                                            name="teamMemberName"
                                            className="form-control"
                                            placeholder="TeamMember Name"
                                            value={this.state.teamMemberName}
                                            type="text"
                                            onChange={this.handleChange}
                                            autoFocus
                                            required={true}
                                        />

                                    </div>

                                    <div className="form-group">

                                        <input
                                            name="teamMemberEmail"
                                            className="form-control"
                                            placeholder="teamMemberEmail"
                                            value={this.state.teamMemberEmail}
                                            type="text"
                                            onChange={this.handleChange}
                                            autoFocus
                                            required={true}
                                        />

                                    </div>

                                    <div className="form-group">

                                        <input
                                            name="teamMemberNationalId"
                                            className="form-control"
                                            placeholder="NationalId"
                                            value={this.state.teamMemberNationalId}
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
                                        <Link to="/registered_team_members">View Registered Employess</Link>
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


TeamMemberSignUp.propTypes = {
    registerTeamMember: PropTypes.func.isRequired,
    signUpSuccessful: PropTypes.bool.isRequired,
    fetchAllCompany: PropTypes.func.isRequired,
    registeredCompany: PropTypes.arrayOf(PropTypes.object).isRequired,
    registeredGender: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllGender: PropTypes.func.isRequired,
    fetchAllTeams: PropTypes.func.isRequired,
    registeredTeams: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
    signUpSuccessful: state.team_member_sign_up.signUpSuccessful,
    registeredCompany: state.company.registeredCompany,
    registeredGender: state.gender_info.registeredGender,
    registeredTeams: state.teams.registeredTeams
});



const mapDispatchToProps = dispatch => ({
    registerTeamMember: payload => dispatch(registerTeamMember(payload)),
    fetchAllCompany: () => dispatch(fetchAllCompany()),
    fetchAllGender: () => dispatch(fetchAllGender()),
    fetchAllTeams: () => dispatch(fetchAllTeams())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamMemberSignUp);