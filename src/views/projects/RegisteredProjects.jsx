import React, {Component} from 'react';
import { fetchAllProjects, setProject} from "../../store/modules/projects/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";


class RegisteredProjects extends Component {

    componentDidMount() {
        this.props.fetchAllProjects();


    }


    blog = () => {
        const projectTitle = (
            <ul>
                {this.props.registeredProjects.map((post) =>
                    <a
                        onClick={() => {this.selected(post)}}

                    ><h6>
                        <ul key={post.id}>
                            {post.ProjectTitle}
                        </ul>
                    </h6></a>
                )}
            </ul>

        );
         return (<div>{projectTitle}</div>);
    }

    selected = (projectSelect) => {
        this.props.setProject(projectSelect);
         this.props.history.push('/project_detail');
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
    setProject: PropTypes.func.isRequired,
    projectSelect: PropTypes.object.isRequired

};


const mapStateToProps = state => ({
    registeredProjects: state.projects.registeredProjects,
    projectSelect: state.projects.projectSelect,
});



const mapDispatchToProps = dispatch => ({
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    setProject: payload => dispatch(setProject(payload)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisteredProjects);