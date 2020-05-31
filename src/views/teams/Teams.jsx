import React, {Component} from 'react';

import { connect } from "react-redux";

import PropTypes from "prop-types";
import {registerTeams, fetchAllTeams} from "../../store/modules/teams/actions";
import Table from "../../components/table/table_body/Table";


class Teams extends Component {

    state = {
        teamName:'',

        tableData: [],
        tableHeaders: {
            TeamId:'#',
            TeamName:'TeamName',

        }
    };


    componentDidMount() {
        this.props.fetchAllTeams();
    }

    // componentDidUpdate(prevProps) {
    //     if(this.props.registeredChildrenTips !== prevProps.registeredChildrenTips) {
    //         if(this.props.registeredChildrenTips.length > 0) {
    //             let allregisteredChildrenTips = this.props.registeredChildrenTips;
    //
    //             allregisteredChildrenTips = allregisteredChildrenTips.map(item => {
    //                 return {
    //                     label: item.registeredChildrenTips,
    //                     value: item.CompanyId
    //                 };
    //             });
    //             this.setState({ AllCompanies: allregisteredChildrenTips });
    //         }
    //     }
    // };



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
        };

        this.props.registerCompany(payload);
        this.setState({
            teamName:'',
           });
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Register Team</h3>
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
                                        name="companyName"
                                        className="form-control"
                                        placeholder="companyName"
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
                    </div>
                </div>

                <Table tableTitle='Registered Teams'
                       tableHeaderObject={this.state.tableHeaders}
                       tableData={this.props.registeredTeams}/>
            </div>
        );
    }
}


Teams.propTypes = {
    registerTeams: PropTypes.func.isRequired,
    teamsSuccessFullyRegistered: PropTypes.bool.isRequired,
    fetchAllTeams: PropTypes.func.isRequired,
    registeredTeams: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
    teamsSuccessFullyRegistered: state.teams.teamsSuccessFullyRegistered,
    registeredTeams: state.teams.registeredTeams
});



const mapDispatchToProps = dispatch => ({
    registerTeams: payload => dispatch(registerTeams(payload)),
    fetchAllTeams: () => dispatch(fetchAllTeams())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Teams);