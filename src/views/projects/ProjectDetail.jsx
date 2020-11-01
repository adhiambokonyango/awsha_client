import React, {Component} from 'react';
import PropTypes from "prop-types";
import {fetchAllProjects, updateProjectProgress} from "../../store/modules/projects/actions";
import {connect} from "react-redux";
import {Col, Container, ProgressBar, Row} from "react-bootstrap";
import Objectives from "../objectives/Objectives";
import './ProjectDetail.css';
import {setObjectivePercentage, projectSelectionQuery, updateIsCheckBoxChecked} from "../../store/modules/objectives/actions";
import {resetPrivilegeUpdate} from "../../store/modules/branch_project/actions";
import {fetchAllObjectives} from "../../store/modules/objectives/actions";
import NavigationBar from "../admin_page/nav_bar/NavigationBar";
import CheckBox from "../../components/check_box/CheckBox";
import '../report_system/Report.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Teams from "../teams/Teams";
import {projectSelectionQueryForTeams} from "../../store/modules/teams/actions";
import {FaCogs, FaEdit, FaTrash} from "react-icons/fa";
import Modal from "react-awesome-modal";
import Select from "react-select";
import {registerTeamMember, registerTeamLead, setTeam,
    projectSelectionQueryForTeamLead,
    projectSelectionQueryForTeamMembers,
    updateLeadIsCheckBoxChecked,
    updateMemberIsCheckBoxChecked,
    setLead,
    setMember
} from "../../store/modules/teams/actions";
import {fetchAllAdministrator, setAdministrator} from "../../store/user_management/administrator_sign_up/actions";
import {fetchAllUser, setUser} from "../../store/user_management/user_sign_up/actions";


class ProjectDetail extends Component {
    state = {
        data: [],
        progress:0,
        array:{},
        animations: false,
        checker: '',
        percentage:'',
        update: false,

        display: false,
        teamId: '',
        teamSelection:'',

        selectedOptionTwo: '',
        selectOptionsTwo: [],
        selectedOption: '',
        selectOptions: [],

        leads: [],
        userMembers: [],

        leadRegistrationErrorMsg: ''
    };



    componentDidMount() {
        this.props.fetchAllObjectives();

        this.handleProjectId();
        this.setState({
            progress: this.props.projectSelect.ProjectProgress
        })

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.fetchedProjectObjective !== prevProps.fetchedProjectObjective) {
            if(this.props.fetchedProjectObjective && this.props.fetchedProjectObjective.length > 0) {
                let list = [];
                for(let i = 0;i<this.props.fetchedProjectObjective.length;i++) {
                    list.push(<p className="detail_title">
                            <CheckBox label={this.props.fetchedProjectObjective[i].ObjectiveDescription + ":" +
                            " " + this.props.fetchedProjectObjective[i].ObjectivePercentage + "%" }
                                      handleCheckBoxIsChecked={this.selectedPercentage}
                                      handleCheckBoxIsUnchecked={this.deselectedPercentage}
                                      checkBoxObject={this.props.fetchedProjectObjective[i]}
                                      isCheckBoxChecked={this.props.fetchedProjectObjective[i].IsCheckBoxChecked === 1}
                            />
                        </p>
                    )
                    this.setState({data: list});
                }
            }
        }


        if(this.props.fetchedTeamLead !== prevProps.fetchedTeamLead) {
            if(this.props.fetchedTeamLead && this.props.fetchedTeamLead.length > 0) {
                let isLead = [];
                let notLead = [];
                    for(let i = 0;i<this.props.fetchedTeamLead.length;i++) {
                        if(this.props.fetchedTeamLead[i].IsCheckBoxChecked === 1){
                            isLead.push(<p className="detail_title">
                                    <CheckBox label={this.narrative(this.props.fetchedTeamLead[i].AdministratorId)}
                                              handleCheckBoxIsChecked={this.selectedLead}
                                              handleCheckBoxIsUnchecked={this.selectedLead}
                                              checkBoxObject={this.props.fetchedTeamLead[i]}
                                              isCheckBoxChecked={this.props.fetchedTeamLead[i].IsCheckBoxChecked === 1}
                                    />
                                </p>
                            )
                            this.setState({leads: isLead});
                        } else {
                            this.setState({leads: notLead});
                        }
                    }

            }
        }


        if(this.props.fetchedTeamMember !== prevProps.fetchedTeamMember) {
            if(this.props.fetchedTeamMember && this.props.fetchedTeamMember.length > 0) {
                let member = [];
                let notMember = [];
                for(let i = 0;i<this.props.fetchedTeamMember.length;i++) {
                    if(this.props.fetchedTeamMember[i].IsCheckBoxChecked === 1){
                        member.push(<p className="detail_title">
                                <CheckBox label={this.userNarrative(this.props.fetchedTeamMember[i].UserId)}
                                          handleCheckBoxIsChecked={this.selectedMember}
                                          handleCheckBoxIsUnchecked={this.selectedMember}
                                          checkBoxObject={this.props.fetchedTeamMember[i]}
                                          isCheckBoxChecked={this.props.fetchedTeamMember[i].IsCheckBoxChecked === 1}
                                />
                            </p>
                        )
                        this.setState({userMembers: member});
                    } else {
                        this.setState({userMembers: notMember});
                    }
                }
            }
        }


        if(this.props.registeredAdministrator !== prevProps.registeredAdministrator) {
            if(this.props.registeredAdministrator.length > 0) {
                let allregisteredGender = this.props.registeredAdministrator;

                allregisteredGender = allregisteredGender.map((item, key) => {
                    return {
                        label: item.FirstName +" " + item.Surname,
                        value: item.AdministratorId
                    };
                });
                this.setState({ selectOptions: allregisteredGender });
            }
        }

        if(this.props.registeredUser !== prevProps.registeredUser) {
            if(this.props.registeredUser.length > 0) {
                let allregisteredGender = this.props.registeredUser;

                allregisteredGender = allregisteredGender.map(item => {
                    return {
                        label: item.FirstName +" " + item.Surname,
                        value: item.UserId
                    };
                });
                this.setState({ selectOptionsTwo: allregisteredGender });
            }
        }


        if(this.props.teamLeadSuccessFullyRegistered !== prevProps.teamLeadSuccessFullyRegistered) {
            if(this.props.teamLeadSuccessFullyRegistered ) {
                this.props.resetPrivilegeUpdate();
            }
        }

        if(this.props.teamMemberSuccessFullyRegistered !== prevProps.teamMemberSuccessFullyRegistered) {
            if(this.props.teamMemberSuccessFullyRegistered ) {
                this.props.resetPrivilegeUpdate();
            }
        }

        if(this.props.leadIsCheckBoxCheckedSuccessFullyUpdated !== prevProps.leadIsCheckBoxCheckedSuccessFullyUpdated) {
            if(this.props.leadIsCheckBoxCheckedSuccessFullyUpdated ) {
                this.props.resetPrivilegeUpdate();
            }
        }

        if(this.props.memberIsCheckBoxCheckedSuccessFullyUpdated !== prevProps.memberIsCheckBoxCheckedSuccessFullyUpdated) {
            if(this.props.memberIsCheckBoxCheckedSuccessFullyUpdated ) {
                this.props.resetPrivilegeUpdate();
            }
        }


        if(this.props.projectProgressSuccessFullyUpdated !== prevProps.projectProgressSuccessFullyUpdated) {
            if(this.props.projectProgressSuccessFullyUpdated ) {
                this.handleProjectId();
                this.props.fetchAllProjects();
                this.props.resetPrivilegeUpdate();
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

    handleProjectId = () => {
        const { projectSelect} = this.props;
      const payload = {
          ProjectId: projectSelect.ProjectId
      }
        this.props.projectSelectionQuery(payload);
        this.props.projectSelectionQueryForTeams(payload);
    }
    selectedPercentage = async (selected) => {
        await this.props.setObjectivePercentage(selected);
        const checkBox = {
            ColumnName: "ObjectiveId",
            ColumnValue: selected.ObjectiveId,
            IsCheckBoxChecked: selected.IsCheckBoxChecked === 1 ? 0 : 1
        }
        this.props.updateIsCheckBoxChecked(checkBox);

        if(selected.IsCheckBoxChecked === 0){
            this.setState({
                progress: selected.ObjectivePercentage + this.state.progress,

            })
            const payload = {
                ColumnName: "ProjectId",
                ColumnValue: this.props.projectSelect.ProjectId,
                ProjectProgress: this.state.progress
            };
            this.props.updateProjectProgress(payload);
        }
        this.successTimer();
    }

    deselectedPercentage = async (deselected) => {
        await this.props.setObjectivePercentage(deselected);
        const checkBox = {
            ColumnName: "ObjectiveId",
            ColumnValue: deselected.ObjectiveId,
            IsCheckBoxChecked: deselected.IsCheckBoxChecked === 0 ? 1 : 0
        }
        this.props.updateIsCheckBoxChecked(checkBox);

        if(deselected.IsCheckBoxChecked === 1){
            this.setState({
                progress: this.state.progress - deselected.ObjectivePercentage

            })
            const payload = {
                ColumnName: "ProjectId",
                ColumnValue: this.props.projectSelect.ProjectId,
                ProjectProgress: this.state.progress
            };
            this.props.updateProjectProgress(payload);
        }
        this.successTimer();
    }

    successTimer = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'I Got you!'
        })
        this.handleProjectId();
    }

    passProjectIdToReport = () => {
        this.props.history.push('/report');
    }

    blog = () => {
        const projectTitle = (
            <ul>
                {this.props.fetchedProjectTeam.map((post) =>

                    <a
                        onClick={() => {
                            this.selected(post)
                        }}>

                        <h6>
                            <ul key={post.TeamId} >
                                {"  "}<FaCogs/>{" "}{post.TeamName}
                            </ul></h6>
                    </a>
                )}
            </ul>
        );
        return (<div>{projectTitle}</div>);
    }



    selected = (selection) => {
        // this.props.setTeam(selection);
        this.setState({
            display: true,
            teamSelection: selection.TeamName,
            teamId: selection.TeamId
        });
        const teamId = {
            TeamId: selection.TeamId
        }
        this.props.projectSelectionQueryForTeamLead(teamId);
        this.props.projectSelectionQueryForTeamMembers(teamId);
    }
    selectedLead = async (deselected) => {
        await this.props.setLead(deselected);
        const checkBox = {
            ColumnName: "TeamLeaderId",
            ColumnValue: deselected.TeamLeaderId,
            IsCheckBoxChecked: deselected.IsCheckBoxChecked === 0 ? 1 : 0
        }
        this.props.updateLeadIsCheckBoxChecked(checkBox);
    }

    selectedMember = async (deselected) => {
        await this.props.setMember(deselected);
        const checkBox = {
            ColumnName: "TeamMemberId",
            ColumnValue: deselected.TeamMemberId,
            IsCheckBoxChecked: deselected.IsCheckBoxChecked === 0 ? 1 : 0
        }
        this.props.updateMemberIsCheckBoxChecked(checkBox);
    }
    narrative = (administratorId) => {
        for (let j=0; j<this.props.registeredAdministrator.length;j++){
            if(administratorId === this.props.registeredAdministrator[j].AdministratorId){

                return (
                    this.props.registeredAdministrator[j].FirstName +" " +  this.props.registeredAdministrator[j].Surname
                )
            }
        }
    }

    userNarrative = (userId) => {
        for (let j=0; j<this.props.registeredUser.length;j++){
            if(userId === this.props.registeredUser[j].UserId){
                return (
                    this.props.registeredUser[j].FirstName +" " + this.props.registeredUser[j].Surname
                )
            }
        }
    }
    handleModalExteriorClicked = () => {
        this.setState({
            display: false
        })
    }

    handleTeamMemberCreate = async(e) => {
        e.preventDefault();

        for(let i=0;i<this.state.selectedOption.length;i++){
            const supervisor = {
                TeamId: this.state.teamId,
                AdministratorId: this.state.selectedOption[i].value,
            }
           await this.props.registerTeamLead(supervisor);
            if(this.props.leadRegistrationUnsuccessful){
                this.setState({
                    leadRegistrationErrorMsg: this.props.leadRegistrationResponse.registrationErrorMessage
                });
            }

        }
        for(let i=0;i<this.state.selectedOptionTwo.length;i++){
            const member = {
                TeamId: this.state.teamId,
                UserId: this.state.selectedOptionTwo[i].value,
            }
           await this.props.registerTeamMember(member);
        }

        this.setState({
            selectedOption: '',
            selectedOptionTwo: '',
        })
    }

    render()
    {
        const { projectSelect, leadRegistrationResponse} = this.props;


            return (
                <div>
                    <NavigationBar/>
                    <Container>
                        <div className="card">
                            <div className="card-content">

                                <Col sm={12} md={4} lg={6}>
                                    <p className="detail_title">{projectSelect.ProjectTitle}</p>
                                    <ProgressBar
                                        animated={this.state.animations}
                                        now={this.state.progress}
                                        label={ `${this.state.progress}%`}
                                        max={100}
                                        min={0}
                                    />
                                    <p>{projectSelect.ProjectDescription}</p>

                                    <h3 className="panel-title ">Register Objectives:</h3>
                                    <Objectives projectSelected={projectSelect.ProjectId}/>

                                </Col>

                                <Col sm={12} md={4} lg={6} className="array">
                                    <div className="vertical_scroll">
                                        <div className="scrollmenu">
                                            {this.state.data }
                                        </div>
                                    </div>

                                </Col>
                                <div>
                                    <Teams projectSelected={projectSelect.ProjectId}/>
                                </div>
                                <Col sm={12} md={4} lg={6} className="array listed_projects">
                                    <h3 className="panel-title card_header">Registered Teams</h3>
                                    <div className="vertical_scroll">
                                        <div className="scrollmenu">
                                            <ul >
                                                {this.blog()}
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                                <Modal
                                    visible={this.state.display}
                                    width="900"
                                    height="600"
                                    effect="fadeInUp"
                                    onClickAway={() => {
                                        this.handleModalExteriorClicked();
                                    }}
                                >
                                    <Container>
                                        <p className="detail_title">{this.state.teamSelection}</p>
                                        <Col sm={12} md={4} lg={6} className="array listed_projects">
                                            <form
                                                action=""
                                                method="POST"
                                                onSubmit={this.handleTeamMemberCreate}
                                                encType="multipart/form-data"
                                            >
                                                <fieldset>

                                                    <p className="detail_title">Select Team Leaders</p>
                                                    <div className="form-group">
                                                        <Select
                                                            className="react-select"
                                                            classNamePrefix="react-select"
                                                            placeholder="Select Administrator"
                                                            name="selectedOption"
                                                            isMulti={true}
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

                                                    <p className="detail_title">Select Team Members</p>
                                                    <div className="form-group">
                                                        <Select
                                                            className="react-select"
                                                            classNamePrefix="react-select"
                                                            placeholder="Select TeamMember"
                                                            name="selectedOptionTwo"
                                                            isMulti
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
                                                    <button
                                                        type="submit"
                                                        className="btn btn-lg btn-success btn-block"
                                                    >
                                                        Submit
                                                    </button>
                                                </fieldset>
                                            </form>
                                        </Col>
                                        <Col sm={12} md={4} lg={6} className="array listed_projects">
                                            <h3 className="panel-title card_header">Team Lead</h3>
                                            <div className="vertical_scroll">
                                                <div className="scrollmenu">
                                                    <ul >
                                                        {this.state.leads}
                                                    </ul>
                                                </div>
                                            </div>
                                            <h3 className="panel-title card_header">Team Member</h3>
                                            <div className="vertical_scroll">
                                                <div className="scrollmenu">
                                                    <ul >
                                                        {this.state.userMembers}
                                                    </ul>
                                                </div>
                                            </div>
                                                {this.state.leadRegistrationErrorMsg}
                                        </Col>

                                    </Container>
                                </Modal>
                                <Col sm={12} md={12} lg={12}>
                                </Col>
                                <Col sm={12} md={12} lg={3}>
                                    <button className="btn waves-effect waves-light red lighten-2 printers"

                                       onClick={this.passProjectIdToReport}
                                       >
                                        Print Report
                                    </button>
                                </Col>


                            </div>
                        </div>

                    </Container>
                </div>
            );
    }
}
ProjectDetail.propTypes = {
    fetchAllProjects: PropTypes.func.isRequired,
    projectSelect: PropTypes.object.isRequired,
    fetchAllBranchProjects: PropTypes.func.isRequired,
    updateBranchProjectStatus: PropTypes.func.isRequired,
    branch: PropTypes.arrayOf(PropTypes.object).isRequired,
    projectStatusSuccessFullyUpdated: PropTypes.bool.isRequired,
    resetPrivilegeUpdate: PropTypes.func.isRequired,
    registerProjects: PropTypes.func.isRequired,
    registeredProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    registeredObjectives: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllObjectives: PropTypes.func.isRequired,
    setObjectivePercentage: PropTypes.func.isRequired,
    percentageSelect: PropTypes.object.isRequired,
    objectiveSelect: PropTypes.object.isRequired,

    projectSelectionQuery: PropTypes.func.isRequired,
    groupFetch: PropTypes.bool.isRequired,

    fetchedProjectObjective: PropTypes.arrayOf(PropTypes.object).isRequired,

    updateProjectProgress: PropTypes.func.isRequired,
    projectProgressSuccessFullyUpdated: PropTypes.bool.isRequired,

    updateIsCheckBoxChecked: PropTypes.func.isRequired,
    isCheckBoxCheckedSuccessFullyUpdated: PropTypes.bool.isRequired,


    updateLeadIsCheckBoxChecked: PropTypes.func.isRequired,
    leadIsCheckBoxCheckedSuccessFullyUpdated: PropTypes.bool.isRequired,

    updateMemberIsCheckBoxChecked: PropTypes.func.isRequired,
    memberIsCheckBoxCheckedSuccessFullyUpdated: PropTypes.bool.isRequired,

    fetchedProjectTeam: PropTypes.arrayOf(PropTypes.object).isRequired,
    projectSelectionQueryForTeams: PropTypes.func.isRequired,
    teamFetch: PropTypes.bool.isRequired,

    fetchAllAdministrator: PropTypes.func.isRequired,
    registeredAdministrator: PropTypes.arrayOf(PropTypes.object).isRequired,

    fetchAllUser: PropTypes.func.isRequired,
    registeredUser: PropTypes.arrayOf(PropTypes.object).isRequired,

    setAdministrator: PropTypes.func.isRequired,
    administratorSelect: PropTypes.object.isRequired,

    setUser: PropTypes.func.isRequired,
    userSelect: PropTypes.object.isRequired,

    setLead: PropTypes.func.isRequired,
    leadSelected: PropTypes.object.isRequired,

    setMember: PropTypes.func.isRequired,
    memberSelected: PropTypes.object.isRequired,

    leadRegistrationResponse: PropTypes.object.isRequired,
    leadRegistrationUnsuccessful: PropTypes.bool.isRequired,

    registerTeamLead: PropTypes.func.isRequired,
    teamLeadSuccessFullyRegistered: PropTypes.bool.isRequired,

    registerTeamMember: PropTypes.func.isRequired,
    teamMemberSuccessFullyRegistered: PropTypes.bool.isRequired,

    fetchedTeamLead: PropTypes.arrayOf(PropTypes.object).isRequired,
    projectSelectionQueryForTeamLead: PropTypes.func.isRequired,
    leadFetch: PropTypes.bool.isRequired,

    fetchedTeamMember: PropTypes.arrayOf(PropTypes.object).isRequired,
    projectSelectionQueryForTeamMembers: PropTypes.func.isRequired,
    memberFetch: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
    projectSelect: state.projects.projectSelect,
    branch: state.branches.branch,
    projectStatusSuccessFullyUpdated: state.branches.projectStatusSuccessFullyUpdated,
    registeredProjects: state.projects.registeredProjects,
    registeredObjectives: state.objectives.registeredObjectives,
    percentageSelect: state.objectives.projectSelect,
    groupFetch: state.objectives.groupFetch,

    fetchedProjectObjective: state.objectives.fetchedProjectObjective,

    projectProgressSuccessFullyUpdated: state.projects.projectProgressSuccessFullyUpdated,

    isCheckBoxCheckedSuccessFullyUpdated: state.objectives.isCheckBoxCheckedSuccessFullyUpdated,

    registeredAdministrator: state.administrator_sign_up.registeredAdministrator,

    registeredUser: state.user_sign_up.registeredUser,

    administratorSelect: state.administrator_sign_up.administratorSelect,

    userSelect: state.user_sign_up.userSelect,

    teamSelected: state.teams.teamSelected,

    leadRegistrationResponse: state.teams.leadRegistrationResponse,
    leadRegistrationUnsuccessful: state.teams.leadRegistrationUnsuccessful,

    teamLeadIsCheckBoxCheckedSuccessFullyUpdated: state.teams.teamLeadIsCheckBoxCheckedSuccessFullyUpdated,
    leadIsCheckBoxCheckedSuccessFullyUpdated: state.teams.leadIsCheckBoxCheckedSuccessFullyUpdated,
    memberIsCheckBoxCheckedSuccessFullyUpdated: state.teams.memberIsCheckBoxCheckedSuccessFullyUpdated,

    leadSelected: state.teams.leadSelected,
    memberSelected: state.teams.memberSelected,


    teamMemberSuccessFullyRegistered: state.teams.teamMemberSuccessFullyRegistered,

    fetchedProjectTeam: state.teams.fetchedProjectTeam,
    teamFetch: state.teams.teamFetch,

    fetchedTeamLead: state.teams.fetchedTeamLead,
    leadFetch: state.teams.leadFetch,

    fetchedTeamMember: state.teams.fetchedTeamMember,
    memberFetch: state.teams.memberFetch,
});
const mapDispatchToProps = dispatch => ({
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    fetchAllObjectives: () => dispatch(fetchAllObjectives()),
    setObjectivePercentage: payload => dispatch(setObjectivePercentage(payload)),
    projectSelectionQuery: payload => dispatch(projectSelectionQuery(payload)),
    updateProjectProgress: payload => dispatch(updateProjectProgress(payload)),
    resetPrivilegeUpdate: () => dispatch(resetPrivilegeUpdate()),
    updateIsCheckBoxChecked: payload => dispatch(updateIsCheckBoxChecked(payload)),
    projectSelectionQueryForTeams: payload => dispatch(projectSelectionQueryForTeams(payload)),

    registerTeamLead: payload => dispatch(registerTeamLead(payload)),
    registerTeamMember: payload => dispatch(registerTeamMember(payload)),

    fetchAllAdministrator: () => dispatch(fetchAllAdministrator()),
    fetchAllUser: () => dispatch(fetchAllUser()),
    setAdministrator: payload => dispatch(setAdministrator(payload)),
    setUser: payload => dispatch(setUser(payload)),
    setTeam: payload => dispatch(setTeam(payload)),
    setLead: payload => dispatch(setLead(payload)),
    setMember: payload => dispatch(setMember(payload)),

    updateMemberIsCheckBoxChecked: payload => dispatch(updateMemberIsCheckBoxChecked(payload)),
    updateLeadIsCheckBoxChecked: payload => dispatch(updateLeadIsCheckBoxChecked(payload)),

    projectSelectionQueryForTeamLead: payload => dispatch(projectSelectionQueryForTeamLead(payload)),
    projectSelectionQueryForTeamMembers: payload => dispatch(projectSelectionQueryForTeamMembers(payload)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetail);