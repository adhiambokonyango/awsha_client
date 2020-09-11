import React, {Component} from 'react';
import {FaList} from "react-icons/fa";
import {registerProjects, fetchAllProjects, projectSelect} from "../../store/modules/projects/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class RegisteredProjects extends Component {
    state = {
        data: {},
    };

    componentDidMount() {
        this.props.fetchAllProjects();

    }
    componentDidUpdate(prevProps) {
        if(this.props.projectsSuccessFullyRegistered !== prevProps.projectsSuccessFullyRegistered) {
            if(this.props.projectsSuccessFullyRegistered) {
                this.props.fetchAllProjects();
            }

        }


    };

    blog = () => {
        const projectTitle = (
            <ul>
                {this.props.registeredProjects.map((post) =>
                    <a
                        //href="/Project Details Section"
                        onClick={() => {this.selected()}}
                    >
                        <h6>
                            <li key={post.id}>
                                {post.ProjectTitle}</li>
                        </h6>
                    </a>
                )}
            </ul>
        );
         return (<div>{projectTitle}</div>);
    }

    selected = () => {
        const payload = {
            ProjectTitle: this.state.data
        }
        this.props.projectSelect(payload);
        this.setState({
            data: this.blog
        })
    }

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Registered Project</h3>
                    </div>
                    <div className="panel-body">
                        {this.blog()}
                    </div>
                </div>
            </div>
        );
    }
}

RegisteredProjects.propTypes = {
    fetchAllProjects: PropTypes.func.isRequired,
    registeredProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    projectSelect: PropTypes.func.isRequired,

};


const mapStateToProps = state => ({
    registeredProjects: state.projects.registeredProjects,

});



const mapDispatchToProps = dispatch => ({
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    projectSelect: payload => dispatch(projectSelect(payload)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisteredProjects);