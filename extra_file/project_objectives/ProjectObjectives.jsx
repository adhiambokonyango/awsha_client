import React, {Component} from 'react';
import {fetchAllProjects} from "../../src/store/modules/projects/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {registerProjectObjectives, fetchAllProjectObjectives} from "../../src/store/modules/project_objectives/actions";
import Table from "../../src/components/table/table_body/Table";
import Select from "react-select";
import {fetchAllObjectives} from "../../src/store/modules/objectives/actions";




class ProjectObjectives extends Component {

    state = {

        selectedOption: '',
        selectOptions: [],

        selectedOptionTwo: '',
        selectOptionsTwo: [],



        tableData: [],
        tableHeaders: {
            ProjectObjectiveId:'#',
            ProjectId:'ProjectId',
            ObjectiveId: 'ObjectiveId'

        }
    };


    componentDidMount() {
        this.props.fetchAllProjects();
        this.props.fetchAllObjectives();
        this.props.fetchAllProjectObjectives();
    }

    componentDidUpdate(prevProps) {
        if(this.props.registeredProjects !== prevProps.registeredProjects) {
            if(this.props.registeredProjects.length > 0) {
                let allregisteredProjects = this.props.registeredProjects;

                allregisteredProjects = allregisteredProjects.map(item => {
                    return {
                        label: item.ProjectTitle,
                        value: item.ProjectId
                    };
                });
                this.setState({ selectOptions: allregisteredProjects });
            }
        }


        if(this.props.registeredObjectives !== prevProps.registeredObjectives) {
            if(this.props.registeredObjectives.length > 0) {
                let allregisteredObjectives = this.props.registeredObjectives;

                allregisteredObjectives = allregisteredObjectives.map(item => {
                    return {
                        label: item.ObjectiveDescription,
                        value: item.ObjectiveId
                    };
                });
                this.setState({ selectOptionsTwo: allregisteredObjectives });
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
            ProjectId:this.state.selectedOption.value,
            ObjectiveId:this.state.selectedOptionTwo.value,



        };

        this.props.registerProjectObjectives(payload);
        this.setState({

        });
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Register Project Objective</h3>
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
                                        placeholder="Select Project"
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
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        placeholder="Select Objective"
                                        name="selectedOptionTwo"
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
                    </div>
                </div>

                <Table tableTitle='Registered ProjectObjectives'
                       tableHeaderObject={this.state.tableHeaders}
                       tableData={this.props.registeredProjectObjectives}
                       />
            </div>
        );
    }
}


ProjectObjectives.propTypes = {
    registerProjectObjectives: PropTypes.func.isRequired,
    projectObjectivesSuccessFullyRegistered: PropTypes.bool.isRequired,
    fetchAllProjectObjectives: PropTypes.func.isRequired,
    registeredProjectObjectives: PropTypes.arrayOf(PropTypes.object).isRequired,
    registeredProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllProjects: PropTypes.func.isRequired,
    fetchAllObjectives: PropTypes.func.isRequired,
    registeredObjectives: PropTypes.arrayOf(PropTypes.object).isRequired,



};


const mapStateToProps = state => ({
    projectObjectivesSuccessFullyRegistered: state.project_objectives.projectObjectivesSuccessFullyRegistered,
    registeredProjectObjectives: state.project_objectives.registeredProjectObjectives,
    registeredProjects: state.projects.registeredProjects,
    registeredObjectives: state.objectives.registeredObjectives,


});



const mapDispatchToProps = dispatch => ({
    registerProjectObjectives: payload => dispatch(registerProjectObjectives(payload)),
    fetchAllProjectObjectives: () => dispatch(fetchAllProjectObjectives()),
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    fetchAllObjectives: () => dispatch(fetchAllObjectives()),


});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectObjectives);