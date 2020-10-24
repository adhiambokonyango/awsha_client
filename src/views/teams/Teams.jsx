import React, {Component} from 'react';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {registerTeams,registerTeamMember, fetchAllTeams, updateTeamLeadIsCheckBoxChecked, registerTeamLead, setTeam} from "../../store/modules/teams/actions";
import Table from "../../components/table/table_body/Table";
import Select from "react-select";
import {Col, Container, Row} from "react-bootstrap";
import {fetchAllAdministrator, setAdministrator} from "../../store/user_management/administrator_sign_up/actions";import {fetchAllGender} from "../../store/modules/gender_info/actions";
import {fetchAllUser} from "../../store/user_management/user_sign_up/actions";
import CheckBox from "../../components/check_box/CheckBox";
import {setObjectivePercentage, updateIsCheckBoxChecked} from "../../store/modules/objectives/actions";
import {setUser} from "../../store/user_management/user_sign_up/actions";
import {FaCogs} from "react-icons/fa";
import Modal from "react-awesome-modal";
import '../projects/Projects.css';
class Teams extends Component {

    state = {
        teamName:'',
        teamId: '',

        teamLead:[],
        teamMember: [],
        teamSelection:'',

        display: false,

        selectedOptionTwo: '',
        selectOptionsTwo: [],

        tableData: [],
        tableHeaders: {
            TeamId:'#',
            TeamName:'TeamName',
            ProjectId: 'ProjectId'
        },
        selectedOption: '',
        selectOptions: [],
    };


    componentDidMount() {
        this.props.fetchAllTeams();
        this.props.fetchAllAdministrator();
        this.props.fetchAllUser();
    }

    componentDidUpdate(prevProps) {
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

        if(this.props.registeredUser !== prevProps.registeredUser) {
            if(this.props.registeredUser && this.props.registeredUser.length > 0) {
                let list = [];
                for(let i = 0;i<this.props.registeredUser.length;i++) {
                    list.push(<p className="detail_title">
                            <CheckBox label={this.props.registeredUser[i].FirstName }
                                      handleCheckBoxIsChecked={this.selectedUser}
                                      handleCheckBoxIsUnchecked={this.deselectedUser}
                                      checkBoxObject={this.props.registeredUser[i]}
                                      isCheckBoxChecked={this.props.registeredUser[i].IsCheckBoxChecked === 1}
                            />
                        </p>
                    )
                    this.setState({teamMember: list});
                }
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

    handleSubmit = ( e) =>{
        e.preventDefault();
        const payload = {
            ProjectId: this.props.projectSelected,
            TeamName:this.state.teamName,
        };

        this.props.registerTeams(payload);
        this.setState({
            teamName:'',
           });
    };

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
    }

    blog = () => {
        const projectTitle = (
            <ul>
                {this.props.registeredTeams.map((post) =>

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
    render() {
        return (
            <div>
                {/*<div className="login-panel panel panel-default">*/}
                {/*    <div className="panel-heading">*/}
                {/*        <h3 className="panel-title">Register Team</h3>*/}
                {/*    </div>*/}
                {/*    <div className="panel-body">*/}

                <Col sm={12} md={12} lg={12}>
                    <h3 className="panel-title">Register Teams:</h3>
                </Col>

                <Col sm={12} md={4} lg={6} className="array">
                    <form
                        action=""
                        method="POST"
                        onSubmit={this.handleSubmit}
                        encType="multipart/form-data"
                    >
                        <fieldset>


                            <div className="form-group">
                                <input
                                    name="teamName"
                                    className="form-control"
                                    placeholder="Team Name"
                                    value={this.state.teamName}
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
                </Col>


                <Col sm={12} md={4} lg={6} className="array listed_projects">
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
                {/*</div>*/}
                {/*</div>*/}

                {/*/!*<Table tableTitle='Registered Teams'*!/*/}
                {/*/!*       tableHeaderObject={this.state.tableHeaders}*!/*/}
                {/*/!*       tableData={this.props.registeredTeams}/>*!/*/}
            </div>
        );
    }
}


Teams.propTypes = {
    registerTeams: PropTypes.func.isRequired,
    teamsSuccessFullyRegistered: PropTypes.bool.isRequired,
    fetchAllTeams: PropTypes.func.isRequired,
    registeredTeams: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllAdministrator: PropTypes.func.isRequired,
    registeredAdministrator: PropTypes.arrayOf(PropTypes.object).isRequired,

    fetchAllUser: PropTypes.func.isRequired,
    registeredUser: PropTypes.arrayOf(PropTypes.object).isRequired,

    setAdministrator: PropTypes.func.isRequired,
    administratorSelect: PropTypes.object.isRequired,

    updateTeamLeadIsCheckBoxChecked: PropTypes.func.isRequired,
    teamLeadIsCheckBoxCheckedSuccessFullyUpdated: PropTypes.bool.isRequired,

    setUser: PropTypes.func.isRequired,
    userSelect: PropTypes.object.isRequired,

    setTeam: PropTypes.func.isRequired,
    teamSelected: PropTypes.object.isRequired,

    registerTeamLead: PropTypes.func.isRequired,
    teamLeadSuccessFullyRegistered: PropTypes.bool.isRequired,

    registerTeamMember: PropTypes.func.isRequired,
    teamMemberSuccessFullyRegistered: PropTypes.bool.isRequired,

};


const mapStateToProps = state => ({
    teamsSuccessFullyRegistered: state.teams.teamsSuccessFullyRegistered,
    teamLeadSuccessFullyRegistered: state.teams.teamLeadSuccessFullyRegistered,
    registeredTeams: state.teams.registeredTeams,
    registeredAdministrator: state.administrator_sign_up.registeredAdministrator,

    registeredUser: state.user_sign_up.registeredUser,

    administratorSelect: state.administrator_sign_up.administratorSelect,

    userSelect: state.user_sign_up.userSelect,

    teamSelected: state.teams.teamSelected,

    teamLeadIsCheckBoxCheckedSuccessFullyUpdated: state.teams.teamLeadIsCheckBoxCheckedSuccessFullyUpdated,

    teamMemberSuccessFullyRegistered: state.teams.teamMemberSuccessFullyRegistered,


});



const mapDispatchToProps = dispatch => ({
    registerTeams: payload => dispatch(registerTeams(payload)),
    registerTeamLead: payload => dispatch(registerTeamLead(payload)),
    registerTeamMember: payload => dispatch(registerTeamMember(payload)),
    fetchAllTeams: () => dispatch(fetchAllTeams()),
    fetchAllAdministrator: () => dispatch(fetchAllAdministrator()),
    fetchAllUser: () => dispatch(fetchAllUser()),
    setAdministrator: payload => dispatch(setAdministrator(payload)),
    setUser: payload => dispatch(setUser(payload)),
    setTeam: payload => dispatch(setTeam(payload)),
    updateTeamLeadIsCheckBoxChecked: payload => dispatch(updateTeamLeadIsCheckBoxChecked(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Teams);