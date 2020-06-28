import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {fetchAllProjectObjectives, registerProjectObjectives} from "../../src/store/modules/project_objectives/actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Demo1 extends Component{

    state = {
        columns: [
            { title: '#', field: 'ProjectObjectiveId' },
            { title: 'ProjectObjective', field: 'ProjectObjective' },
            { title: '', field: '', type: '' },
            {title: '', field: ''},
        ],
        data: [],
    };

    componentDidMount() {
        this.props.fetchAllProjectObjectives();
    };


    handleChange = event => {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState({
            ...newState
        });
    };

    render() {
        return (
            <MaterialTable
                title="Project Objectives"
                columns={this.state.columns}
                data={this.props.registeredProjectObjectives}

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
                                        const data = [...prevState.data];
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

};

const mapStateToProps = state => ({
    registeredProjectObjectives: state.project_objectives.registeredProjectObjectives,

});

const mapDispatchToProps = dispatch => ({
    fetchAllProjectObjectives: () => dispatch(fetchAllProjectObjectives()),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Demo1);