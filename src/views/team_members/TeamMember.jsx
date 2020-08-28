import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import {Link} from "react-router-dom";
import {fetchAllUser} from "../../store/user_management/user_sign_up/actions";
import { fetchAllTeams} from "../../store/modules/teams/actions";
import {registerTeamMember, fetchAllTeamMember} from "../../store/modules/team_members/actions";


class TeamMember extends Component {

    state = {




        selectedOptionOne: '',
        selectOptionsOne: [],

        selectedOptionTwo: '',
        selectOptionsTwo: [],


    };


    componentDidMount() {
        this.props.fetchAllUser();
        this.props.fetchAllTeams();
        this.props.fetchAllTeamMember();
    }

    componentDidUpdate(prevProps) {
        if(this.props.registeredTeams !== prevProps.registeredTeams) {
            if(this.props.registeredTeams.length > 0) {
                let allregisteredTeams = this.props.registeredTeams;

                allregisteredTeams = allregisteredTeams.map(item => {
                    return {
                        label: item.TeamName,
                        value: item.TeamId
                    };
                });
                this.setState({ selectOptionsTwo: allregisteredTeams });
            }
        }

        if(this.props.registeredUser !== prevProps.registeredUser) {
            if(this.props.registeredUser.length > 0) {
                let allregisteredUser = this.props.registeredUser;

                allregisteredUser = allregisteredUser.map(item => {
                    return {
                        label: item.FirstName,
                        value: item.UserId
                    };
                });
                this.setState({ selectOptionsOne: allregisteredUser });
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
            UserId:this.state.selectedOptionOne.value,
            CompanyId:this.state.selectedOptionTwo.value,

        };


        this.props.registerTeamMember(payload);
        this.setState({
        });

    };

    render() {
        return (
            <>

                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Assign users to specific teams</h3>
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
                                            placeholder="Select Team"
                                            name="selectedOptionThree"
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
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            placeholder="Select Officer"
                                            name="selectedOptionOne"
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






                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-success btn-block"
                                    >
                                        Submit
                                    </button>

                                    {/*<button*/}
                                    {/*    type="btn-link"*/}
                                    {/*    className="btn btn-lg btn-success btn-block"*/}
                                    {/*>*/}
                                    {/*    <Link to="/registered_team_members">View Registered Employess</Link>*/}
                                    {/*</button>*/}
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}


TeamMember.propTypes = {
    fetchAllTeams: PropTypes.func.isRequired,
    registeredTeams: PropTypes.arrayOf(PropTypes.object).isRequired,
    registeredUser: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllUser: PropTypes.func.isRequired,
    registerTeamMember: PropTypes.func.isRequired,
    fetchAllTeamMember:PropTypes.func.isRequired,
    registeredTeamMember: PropTypes.arrayOf(PropTypes.object).isRequired
};


const mapStateToProps = state => ({
    registeredTeams: state.teams.registeredTeams,
    registeredUser: state.sign_up.registeredUser,
    registeredTeamMember: state.team_members.registeredTeamMember
});



const mapDispatchToProps = dispatch => ({
    registerTeamMember: payload => dispatch(registerTeamMember(payload)),
    fetchAllTeams: () => dispatch(fetchAllTeams()),
    fetchAllUser: () => dispatch(fetchAllUser()),
    fetchAllTeamMember: () => dispatch(fetchAllTeamMember()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamMember);