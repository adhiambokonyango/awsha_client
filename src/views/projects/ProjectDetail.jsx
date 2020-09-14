import React, {Component} from 'react';
import PropTypes from "prop-types";
import {fetchAllProjects} from "../../store/modules/projects/actions";
import {connect} from "react-redux";
import CheckBoxGroup from "../../components/check_box_group/CheckBoxGroup";
import {Col} from "react-bootstrap";
import {fetchAllBranches} from "../../store/modules/branches/action"

class ProjectDetail extends Component {
    componentDidMount() {
        this.props.fetchAllBranches();

    }

    render()
    {
        const { projectSelect } = this.props;
        return (
            <div>
                <Col sm={12} md={10} lg={10} className="project_detail">
                    <div className="card">
                        <div className="card-content">
                            <p>{projectSelect.ProjectTitle}</p>
                            <p>{projectSelect.ProjectDescription}</p>
                            <p>{projectSelect.ProjectProgress}</p>
                            <CheckBoxGroup title="Branches"
                             checkBoxObjectsArray={this.props.branch}
                            />
                        </div>
                    </div>
                </Col>
            </div>
        );
    }
}

ProjectDetail.propTypes = {
    fetchAllProjects: PropTypes.func.isRequired,
    branch: PropTypes.arrayOf(PropTypes.object).isRequired,
    projectSelect: PropTypes.object.isRequired,
    fetchAllBranches: PropTypes.func.isRequired,

};


const mapStateToProps = state => ({
    branch: state.branches.branch,
    projectSelect: state.projects.projectSelect,

});



const mapDispatchToProps = dispatch => ({
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    fetchAllBranches: () => dispatch(fetchAllBranches()),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetail);