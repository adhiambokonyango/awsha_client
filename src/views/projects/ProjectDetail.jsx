import React, {Component} from 'react';
import PropTypes from "prop-types";
import {fetchAllProjects, setProject} from "../../store/modules/projects/actions";
import {connect} from "react-redux";

class ProjectDetail extends Component {
    state = {
        id:'',
        title:''
    }

    componentDidMount() {
        console.log(this.props);
    }

    render()
    {
        const { projectSelect } = this.props;
        return (
            <div>
                <p>{projectSelect.ProjectTitle}</p>
                <p>{projectSelect.ProjectDescription}</p>
                <p>{projectSelect.ProjectProgress}</p>
            </div>
        );
    }
}

ProjectDetail.propTypes = {
    fetchAllProjects: PropTypes.func.isRequired,
    registeredProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    projectSelect: PropTypes.object.isRequired

};


const mapStateToProps = state => ({
    registeredProjects: state.projects.registeredProjects,
    projectSelect: state.projects.projectSelect,

});



const mapDispatchToProps = dispatch => ({
    fetchAllProjects: () => dispatch(fetchAllProjects()),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetail);