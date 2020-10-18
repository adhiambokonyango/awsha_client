import React, {Component} from 'react';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {registerTeams, fetchAllTeams} from "../../store/modules/teams/actions";
import Table from "../../components/table/table_body/Table";
import Select from "react-select";
import {Col} from "react-bootstrap";
import {fetchAllAdministrator} from "../../store/user_management/administrator_sign_up/actions";import {fetchAllGender} from "../../store/modules/gender_info/actions";
import {fetchAllUser} from "../../store/user_management/user_sign_up/actions";
import CheckBox from "../../components/check_box/CheckBox";

class Teams extends Component {

    state = {
        teamName:'',

        teamLead:[],
        teamMember: [],

        selectedOption: '',
        selectOptions: [],

        tableData: [],
        tableHeaders: {
            TeamId:'#',
            TeamName:'TeamName',
            ProjectId: 'ProjectId'



        }
    };


    componentDidMount() {
        this.props.fetchAllTeams();
        this.props.fetchAllAdministrator();
        this.props.fetchAllUser();
    }

    componentDidUpdate(prevProps) {
        if(this.props.registeredAdministrator !== prevProps.registeredAdministrator) {
            if(this.props.registeredAdministrator && this.props.registeredAdministrator.length > 0) {
                let list = [];
                for(let i = 0;i<this.props.registeredAdministrator.length;i++) {
                    list.push(<p className="detail_title">
                            <CheckBox label={this.props.registeredAdministrator[i].FirstName }
                                      handleCheckBoxIsChecked={this.selectedPercentage}
                                      handleCheckBoxIsUnchecked={this.deselectedPercentage}
                                      checkBoxObject={this.props.registeredAdministrator[i]}
                                      isCheckBoxChecked={this.props.registeredAdministrator[i].IsCheckBoxChecked === 1}
                            />
                        </p>
                    )
                    this.setState({teamLead: list});
                }
            }
        }
        if(this.props.registeredUser !== prevProps.registeredUser) {
            if(this.props.registeredUser && this.props.registeredUser.length > 0) {
                let list = [];
                for(let i = 0;i<this.props.registeredUser.length;i++) {
                    list.push(<p className="detail_title">
                            <CheckBox label={this.props.registeredUser[i].FirstName }
                                      handleCheckBoxIsChecked={this.selectedPercentage}
                                      handleCheckBoxIsUnchecked={this.deselectedPercentage}
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

    handleSubmit = (e) =>{
        e.preventDefault();

        const payload = {
            TeamName:this.state.teamName,
            ProjectId: this.props.projectSelected
        };

        this.props.registerTeams(payload);
        this.setState({
            teamName:'',
           });
    };

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

                    <p className="detail_title">Select Team Leaders</p>
                    <div className="vertical_scroll">
                        <div className="scrollmenu">
                            {this.state.teamLead}
                        </div>
                    </div>

                    <p className="detail_title">Select Team Members</p>
                    <div className="vertical_scroll">
                        <div className="scrollmenu">
                            {this.state.teamMember}
                        </div>
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


                <Col sm={12} md={4} lg={6} className="array">
                    <div className="vertical_scroll">
                        <div className="scrollmenu">
                            {this.state.teamMember}
                        </div>
                    </div>

                </Col>

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

};


const mapStateToProps = state => ({
    teamsSuccessFullyRegistered: state.teams.teamsSuccessFullyRegistered,
    registeredTeams: state.teams.registeredTeams,
    registeredAdministrator: state.administrator_sign_up.registeredAdministrator,

    registeredUser: state.user_sign_up.registeredUser,
});



const mapDispatchToProps = dispatch => ({
    registerTeams: payload => dispatch(registerTeams(payload)),
    fetchAllTeams: () => dispatch(fetchAllTeams()),
    fetchAllAdministrator: () => dispatch(fetchAllAdministrator()),
    fetchAllUser: () => dispatch(fetchAllUser()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Teams);