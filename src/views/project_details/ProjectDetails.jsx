import React, {Component} from 'react';
import {fetchAllProjects} from "../../store/modules/projects/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {fetchAllProjectObjectives} from "../../store/modules/project_objectives/actions";



class ProjectDetails extends Component {
    constructor() {
        super();

        this.state = {
            projectObjective:[],
            selectedOption: false,
        }
    }




    componentDidMount() {
        this.props.fetchAllProjects();
        this.props.fetchAllProjectObjectives();
    }

    componentDidUpdate(prevProps)
{
    if(this.props.registeredProjectObjectives !== prevProps.registeredProjectObjectives) {
        if(this.props.registeredProjectObjectives && this.props.registeredProjectObjectives.length > 0) {

            let list = [];

            for(let i = 0;i<this.props.registeredProjectObjectives.length;i++) {
                list.push(<p><dt>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                // checked={this.state.selectedOption}
                                // onChange={this.onValueChange}
                            />
                            {" " +this.props.registeredProjectObjectives[i].ProjectObjective}

                        </label>
                    </div>
                </dt>
                   <br/></p>);
            }
            this.setState({projectObjective: list});

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
            <form onSubmit={this.handleSubmit}>

                {this.state.projectObjective}
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
    fetchAllProjects: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    registeredProjectObjectives: state.project_objectives.registeredProjectObjectives,
    registeredProjects: state.projects.registeredProjects,
});



const mapDispatchToProps = dispatch => ({
    fetchAllProjectObjectives: () => dispatch(fetchAllProjectObjectives()),
    fetchAllProjects: () => dispatch(fetchAllProjects()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetails);