import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {registerObjectives, fetchAllObjectives} from "../../store/modules/objectives/actions";
import Table from "../../components/table/table_body/Table";
import Select from "react-select";

class Objectives extends Component {

    state = {
        objectiveDescription:'',
        objectivePercentage: '',

        tableData: [],
        tableHeaders: {
            ObjectiveId:'#',
            ProjectId:"ProjectId",
            ObjectiveDescription:"ObjectiveDescription",
            ObjectivePercentage:"ObjectivePercentage",
        }
    };


    componentDidMount() {
        this.props.fetchAllObjectives();

    }
    // componentDidUpdate(prevProps) {
    //     if(this.props.registeredCompany !== prevProps.registeredCompany) {
    //         if(this.props.registeredCompany.length > 0) {
    //             let allregisteredCompany = this.props.registeredCompany;
    //
    //             allregisteredCompany = allregisteredCompany.map(item => {
    //                 return {
    //                     label: item.CompanyName,
    //                     value: item.CompanyId
    //                 };
    //             });
    //             this.setState({ selectOptionsThree: allregisteredCompany });
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
            ObjectiveDescription:this.state.objectiveDescription,
            ObjectivePercentage: this.state.objectivePercentage,
            ProjectId: this.props.projectSelected

        };

        this.props.registerObjectives(payload);
        this.setState({
            objectiveDescription:'',
            objectivePercentage: ''
        });
    };

    render() {
        return (
            <div>
                {/*<div className="login-panel panel panel-default">*/}
                    {/*<div className="panel-heading">*/}
                    {/*    <h3 className="panel-title">Register Objectives</h3>*/}
                    {/*</div>*/}
                    {/*<div className="panel-body">*/}

                        <form
                            action=""
                            method="POST"
                            onSubmit={this.handleSubmit}
                            encType="multipart/form-data"
                        >
                            <fieldset>
                                <div className="form-group">
                                     <textarea
                                         name="objectiveDescription"
                                         cols="50" rows="5"
                                         className="form-control "
                                         placeholder="Describe Objective"
                                         value={this.state.objectiveDescription}
                                         onChange={this.handleChange}
                                         autoFocus
                                         required={true}
                                     >
                                    </textarea>
                                    {/*<input*/}
                                    {/*    name="objectiveDescription"*/}
                                    {/*    className="form-control"*/}
                                    {/*    placeholder="Description"*/}
                                    {/*    value={this.state.objectiveDescription}*/}
                                    {/*    type="text"*/}
                                    {/*    onChange={this.handleChange}*/}
                                    {/*    autoFocus*/}
                                    {/*    required={true}*/}
                                    {/*/>*/}
                                </div>
                                <div className="form-group">
                                    <input
                                        name="objectivePercentage"
                                        className="form-control"
                                        placeholder="Percentage"
                                        value={this.state.objectivePercentage}
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
                    {/*</div>*/}
                {/*</div>*/}

                {/*<Table tableTitle='Registered Projects'*/}
                {/*       tableHeaderObject={this.state.tableHeaders}*/}
                {/*       tableData={this.props.registeredObjectives}/>*/}
            </div>
        );
    }
}


Objectives.propTypes = {
    registerObjectives: PropTypes.func.isRequired,
    objectivesSuccessFullyRegistered: PropTypes.bool.isRequired,
    fetchAllObjectives: PropTypes.func.isRequired,
    registeredObjectives: PropTypes.arrayOf(PropTypes.object).isRequired,

};


const mapStateToProps = state => ({
    objectivesSuccessFullyRegistered: state.objectives.projectsSuccessFullyRegistered,
    registeredObjectives: state.objectives.registeredObjectives,

});



const mapDispatchToProps = dispatch => ({
    registerObjectives: payload => dispatch(registerObjectives(payload)),
    fetchAllObjectives: () => dispatch(fetchAllObjectives()),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Objectives);