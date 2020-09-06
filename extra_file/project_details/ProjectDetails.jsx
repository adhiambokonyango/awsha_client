import React, {Component} from 'react';
import {fetchAllProjects} from "../../src/store/modules/projects/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {fetchAllProjectObjectives} from "../../src/store/modules/project_objectives/actions";
import {fetchAllObjectivePercentage} from "../../src/store/modules/objective_percentage/actions";



class ProjectDetails extends Component {
    constructor() {
        super();

        this.state = {
            projectObjective:[],

            objectivePercentage: [],
        }
    }




    componentDidMount() {
        this.props.fetchAllProjects();
        this.props.fetchAllProjectObjectives();
        this.props.fetchAllObjectivePercentage();
    }

    componentDidUpdate(prevProps)
{
    if(this.props.registeredProjectObjectives !== prevProps.registeredProjectObjectives) {
        if(this.props.registeredProjectObjectives && this.props.registeredProjectObjectives.length > 0) {





            let list = [];
            let listTwo = [];

            for(let i = 0;i<this.props.registeredProjectObjectives.length;i++) {
                for(let j = 0;i<this.props.registeredObjectivePercentage.length;j++){
                    list.push(<p><dt>
                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                />

                                {" " +this.props.registeredProjectObjectives[i].ProjectObjective}
                                {" " +this.props.registeredObjectivePercentage[j].ObjectivePercentage}

                            </label>
                        </div>
                    </dt>
                        <br/></p>);

                }

            }

            this.setState({projectObjective: list, objectivePercentage: listTwo});

                }
            }

        }



    handleChange = event => {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState({
            ...newState
        });
    };

    handleSubmit = (e) =>{
        e.preventDefault();

        this.setState({



        });
    };

    render() {
        return (
            <form className='myForm' onSubmit={this.handleSubmit}>

                <div className="col-md-5">
                    {this.state.projectObjective}
                </div>
                <div className="col-md-5">
                    {this.state.objectivePercentage}
                </div>
                <button
                    type="submit"
                    className="btn btn-lg btn-success btn-block"
                    >
                    Submit
                </button>
            </form>
        );
    }
}


ProjectDetails.propTypes = {
    fetchAllProjectObjectives: PropTypes.func.isRequired,
    registeredProjectObjectives: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllObjectivePercentage: PropTypes.func.isRequired,
    registeredObjectivePercentage: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllProjects: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    registeredProjectObjectives: state.project_objectives.registeredProjectObjectives,
    registeredProjects: state.projects.registeredProjects,
    registeredObjectivePercentage: state.objective_percentage.registeredObjectivePercentage,
});



const mapDispatchToProps = dispatch => ({
    fetchAllProjectObjectives: () => dispatch(fetchAllProjectObjectives()),
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    fetchAllObjectivePercentage: () => dispatch(fetchAllObjectivePercentage()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetails);