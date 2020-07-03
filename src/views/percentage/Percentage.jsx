import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../../components/table/table_body/Table";
import Select from "react-select";
import {fetchAllObjectivePercentage, registerObjectivePercentage} from "../../store/modules/objective_percentage/actions";




class Percentage extends Component {

    state = {
        percentage: '',



        tableData: [],
        tableHeaders: {
            ObjectivePercentageId:'#',

            ObjectivePercentage: 'ObjectivePercentage'

        }
    };


    componentDidMount() {
        this.props.fetchAllObjectivePercentage();
    }

    // componentDidUpdate(prevProps) {
    //     if(this.props.registeredProjectObjectives !== prevProps.registeredProjectObjectives) {
    //         if(this.props.registeredProjectObjectives.length > 0) {
    //             let allregisteredProjectObjectives = this.props.registeredProjectObjectives;
    //
    //             allregisteredProjectObjectives = allregisteredProjectObjectives.map(item => {
    //                 return {
    //                     label: item.ProjectObjective,
    //                     value: item.ProjectObjectiveId
    //                 };
    //             });
    //             this.setState({ selectOptions: allregisteredProjectObjectives });
    //         }
    //     }
    //
    //
    //
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




            ObjectivePercentage:this.state.percentage,


        };


        this.props.registerObjectivePercentage(payload);
        this.setState({

            percentage: '',

        });
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Register Percentage</h3>
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
                                        name="percentage"
                                        className="form-control"
                                        placeholder="Percentage"
                                        value={this.state.percentage}
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

                <Table tableTitle='Registered percentage'
                       tableHeaderObject={this.state.tableHeaders}
                       tableData={this.props.registeredObjectivePercentage}
                />
            </div>
        );
    }
}


Percentage.propTypes = {
    fetchAllObjectivePercentage: PropTypes.func.isRequired,
    registerObjectivePercentage: PropTypes.func.isRequired,
    registeredObjectivePercentage: PropTypes.arrayOf(PropTypes.object).isRequired,

};


const mapStateToProps = state => ({
    objectivePercentageSuccessFullyRegistered: state.objective_percentage.objectivePercentageSuccessFullyRegistered,
    registeredObjectivePercentage: state.objective_percentage.registeredObjectivePercentage,

});



const mapDispatchToProps = dispatch => ({
    fetchAllObjectivePercentage: () => dispatch(fetchAllObjectivePercentage()),
    registerObjectivePercentage: payload => dispatch(registerObjectivePercentage(payload)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Percentage);