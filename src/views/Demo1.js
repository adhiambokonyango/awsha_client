import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {fetchAllProjectObjectives} from "../store/modules/project_objectives/actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fetchAllObjectivePercentage, registerObjectivePercentage} from "../store/modules/objective_percentage/actions";


class Demo1 extends Component{

    state = {
        columns: [
            { title: '#', field: 'ProjectObjectiveId' },
            { title: 'Objective', field: 'ProjectObjective' },
            { title: 'ObjectivePercentage', field: 'ObjectivePercentage', type: 'numeric' },
            {title: '', field: ''},
        ],
        data: [],
        dataObjectivePercentage:[],
        percentage: '',
    };

    componentDidMount() {
        this.props.fetchAllProjectObjectives();
        this.props.fetchAllObjectivePercentage();

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


            ObjectivePercentage:this.state.percentage,


        };


        this.props.registerObjectivePercentage(payload);
        this.setState({

            percentage: '',

        });
    };



    render() {
        return (
            <MaterialTable
                title="Project Objectives"
                columns={this.state.columns}
                data={this.props.registeredProjectObjectives}
                dataObjectivePercentage={this.props.registeredObjectivePercentage}

                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                this.setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    this.setState((prevState) => {
                                        const data = [...prevState.percentage];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                }
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                this.setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                }}

            />
        );
    }
}


Demo1.propTypes = {
    fetchAllProjectObjectives: PropTypes.func.isRequired,
    registeredProjectObjectives: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllObjectivePercentage: PropTypes.func.isRequired,
    registerObjectivePercentage: PropTypes.func.isRequired,
    registeredObjectivePercentage: PropTypes.arrayOf(PropTypes.object).isRequired,

};

const mapStateToProps = state => ({
    registeredProjectObjectives: state.project_objectives.registeredProjectObjectives,
    objectivePercentageSuccessFullyRegistered: state.objective_percentage.objectivePercentageSuccessFullyRegistered,
    registeredObjectivePercentage: state.objective_percentage.registeredObjectivePercentage,


});

const mapDispatchToProps = dispatch => ({
    fetchAllProjectObjectives: () => dispatch(fetchAllProjectObjectives()),
    fetchAllObjectivePercentage: () => dispatch(fetchAllObjectivePercentage()),
    registerObjectivePercentage: payload => dispatch(registerObjectivePercentage(payload)),


});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Demo1);