import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {registerProjects, fetchAllProjects} from "../../store/modules/projects/actions";
import Table from "../../components/table/table_body/Table";
import Select from "react-select";
import {fetchAllCompany} from "../../store/modules/company/actions";
import {fetchAllTeams} from "../../store/modules/teams/actions";
import {fetchAllTeamMember} from "../../store/modules/team_member_sign_up/actions";


class Projects extends Component {

    state = {
        projectTitle:'',
        projectDescription:'',

        selectedOptionThree: '',
        selectOptionsThree: [],

        selectedOptionOne: '',
        selectOptionsOne: [],

        selectedOptionTwo: '',
        selectOptionsTwo: [],

        tableData: [],
        tableHeaders: {
            ProjectId:'#',
            ProjectTitle:'ProjectTitle',
            ProjectDescription:'ProjectDescription',
        }
    };


    componentDidMount() {
        this.props.fetchAllProjects();
        this.props.fetchAllCompany();
        this.props.fetchAllTeams();
        this.props.fetchAllTeamMember();
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

        if(this.props.registeredTeamMember !== prevProps.registeredTeamMember) {
            if(this.props.registeredTeamMember.length > 0) {
                let allregisteredTeamMember = this.props.registeredTeamMember;

                allregisteredTeamMember = allregisteredTeamMember.map(item => {
                    return {
                        label: item.TeamMemberName,
                        value: item.TeamMemberId
                    };
                });
                this.setState({ selectOptionsTwo: allregisteredTeamMember });
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
            ProjectTitle:this.state.projectTitle,
            ProjectDescription:this.state.projectDescription,
            TeamId:this.state.selectedOptionOne.value,
            CompanyId:this.state.selectedOptionThree.value,
            TeamMemberId:this.state.selectedOptionTwo.value,

        };

        this.props.registerProjects(payload);
        this.setState({
            projectTitle:'',
            projectDescription:'',
        });
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Register Project</h3>
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
                                        placeholder="Select Officer"
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
                                        name="projectTitle"
                                        className="form-control"
                                        placeholder="projectTitle"
                                        value={this.state.projectTitle}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                    <input
                                        name="projectDescription"
                                        className="form-control"
                                        placeholder="projectDescription"
                                        value={this.state.projectDescription}
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
                </div>

                <Table tableTitle='Registered Projects'
                       tableHeaderObject={this.state.tableHeaders}
                       tableData={this.props.registeredProjects}/>
            </div>
        );
    }
}


Projects.propTypes = {
    registerProjects: PropTypes.func.isRequired,
    projectsSuccessFullyRegistered: PropTypes.bool.isRequired,
    fetchAllProjects: PropTypes.func.isRequired,
    registeredProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllCompany: PropTypes.func.isRequired,
    registeredCompany: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllTeams: PropTypes.func.isRequired,
    registeredTeams: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllTeamMember: PropTypes.func.isRequired,
    registeredTeamMember: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
    projectsSuccessFullyRegistered: state.projects.projectsSuccessFullyRegistered,
    registeredProjects: state.projects.registeredProjects,
    registeredCompany: state.company.registeredCompany,
    registeredTeams: state.teams.registeredTeams,
    registeredTeamMember: state.team_member_sign_up.registeredTeamMember,
});



const mapDispatchToProps = dispatch => ({
    registerProjects: payload => dispatch(registerProjects(payload)),
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    fetchAllCompany: () => dispatch(fetchAllCompany()),
    fetchAllTeams: () => dispatch(fetchAllTeams()),
    fetchAllTeamMember: () => dispatch(fetchAllTeamMember()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Projects);