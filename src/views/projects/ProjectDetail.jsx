import React, {Component} from 'react';
import PropTypes from "prop-types";
import {fetchAllProjects} from "../../store/modules/projects/actions";
import {connect} from "react-redux";
import CheckBoxGroup from "../../components/check_box_group/CheckBoxGroup";

class ProjectDetail extends Component {
    componentDidMount() {
        this.props.fetchAllProjects();
    }

    render()
    {
        const { projectSelect } = this.props;
        return (
            <div>
                <p>{projectSelect.ProjectTitle}</p>
                <p>{projectSelect.ProjectDescription}</p>
                <p>{projectSelect.ProjectProgress}</p>

                <CheckBoxGroup title="Branches"
                               checkBoxObjectsArray={this.props.registeredProjects}
                />
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