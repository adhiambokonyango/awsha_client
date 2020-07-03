import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {registerObjectives, fetchAllObjectives} from "../../store/modules/objectives/actions";
import Table from "../../components/table/table_body/Table";
import Select from "react-select";

class Objectives extends Component {

    state = {
        objective:'',

        tableData: [],
        tableHeaders: {
            ObjectiveId:'#',
            ObjectiveDescription:'ObjectiveDescription',
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
            ObjectiveDescription:this.state.objective,


        };

        this.props.registerProjects(payload);
        this.setState({
            objective:'',
        });
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Register Objectives</h3>
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
                                        name="objective"
                                        className="form-control"
                                        placeholder="objective"
                                        value={this.state.objective}
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

                <Table tableTitle='Registered Projects'
                       tableHeaderObject={this.state.tableHeaders}
                       tableData={this.props.registeredObjectives}/>
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