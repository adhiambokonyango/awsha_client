import React, {Component} from 'react';

import { connect } from "react-redux";
import {fetchAllCompany} from "../../store/modules/company/actions";
import PropTypes from "prop-types";
import {registerTeams, fetchAllTeams} from "../../store/modules/teams/actions";
import Table from "../../components/table/table_body/Table";
import Select from "react-select";


class Teams extends Component {

    state = {
        teamName:'',

        companyName: '',

        selectedOption: '',
        selectOptions: [],

        tableData: [],
        tableHeaders: {
            TeamId:'#',
            TeamName:'TeamName',
            CompanyName:'CompanyName',


        }
    };


    componentDidMount() {
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
                this.setState({ selectOptions: allregisteredCompany });
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
            CompanyId:this.state.selectedOption.value,
            TeamName:this.state.teamName,
            CompanyName:this.state.companyName,
        };

        this.props.registerTeams(payload);
        this.setState({
            teamName:'',
            companyName: ''
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
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        placeholder="Select Company"
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
    fetchAllCompany: PropTypes.func.isRequired,
    registeredCompany: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
    teamsSuccessFullyRegistered: state.teams.teamsSuccessFullyRegistered,
    registeredTeams: state.teams.registeredTeams,
    registeredCompany: state.company.registeredCompany
});



const mapDispatchToProps = dispatch => ({
    registerTeams: payload => dispatch(registerTeams(payload)),
    fetchAllTeams: () => dispatch(fetchAllTeams()),
    fetchAllCompany: () => dispatch(fetchAllCompany())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Teams);