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
import {FaCogs} from "react-icons/fa";
import Modal from "react-awesome-modal";
import Select from "react-select";
import {registerTeams,registerTeamMember, fetchAllTeams, updateTeamLeadIsCheckBoxChecked, registerTeamLead, setTeam} from "../../store/modules/teams/actions";
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
                            <CheckBox label={this.props.fetchedProjectObjective[i].ObjectiveDescription + ":" + " " + this.props.fetchedProjectObjective[i].ObjectivePercentage + "%"}
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

        if(this.props.registeredAdministrator !== prevProps.registeredAdministrator) {
            if(this.props.registeredAdministrator.length > 0) {
                let allregisteredGender = this.props.registeredAdministrator;

                allregisteredGender = allregisteredGender.map((item, key) => {
                    return {
                        label: item.FirstName,
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
                        label: item.FirstName,
                        value: item.UserId
                    };
                });
                this.setState({ selectOptionsTwo: allregisteredGender });
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
        })
    }
    handleModalExteriorClicked = () => {
        this.setState({
            display: false
        })
    }

    handleTeamMemberCreate = (e) => {
        e.preventDefault();

        for(let i=0;i<this.state.selectedOption.length;i++){
            const supervisor = {
                TeamId: this.state.teamId,
                AdministratorId: this.state.selectedOption[i].value,
            }
            this.props.registerTeamLead(supervisor);
        }
        for(let i=0;i<this.state.selectedOptionTwo.length;i++){
            const member = {
                TeamId: this.state.teamId,
                UserId: this.state.selectedOptionTwo[i].value,
            }
            this.props.registerTeamMember(member);
        }
        this.setState({
            selectedOption: '',
            selectedOptionTwo: ''
        })
    }

    render()
    {
        const { projectSelect} = this.props;


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
                                            {this.state.data}
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

    registerTeamLead: PropTypes.func.isRequired,
    teamLeadSuccessFullyRegistered: PropTypes.bool.isRequired,

    registerTeamMember: PropTypes.func.isRequired,
    teamMemberSuccessFullyRegistered: PropTypes.bool.isRequired,
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

    teamLeadIsCheckBoxCheckedSuccessFullyUpdated: state.teams.teamLeadIsCheckBoxCheckedSuccessFullyUpdated,

    teamMemberSuccessFullyRegistered: state.teams.teamMemberSuccessFullyRegistered,

    fetchedProjectTeam: state.teams.fetchedProjectTeam,
    teamFetch: state.teams.teamFetch,
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

});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetail);