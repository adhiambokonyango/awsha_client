import React, {Component} from 'react';
import PropTypes from "prop-types";
import {fetchAllProjects} from "../../store/modules/projects/actions";
import {connect} from "react-redux";
import {FaList} from "react-icons/fa";

class ProjectDetail extends Component {
    state = {

    }
    componentDidMount() {
        this.props.fetchAllProjects();
    }




    render()
    {
        return (
            <div>

            </div>
        );
    }
}

ProjectDetail.propTypes = {
    fetchAllProjects: PropTypes.func.isRequired,
    registeredProjects: PropTypes.arrayOf(PropTypes.object).isRequired,

};


const mapStateToProps = state => ({
    registeredProjects: state.projects.registeredProjects,

});



const mapDispatchToProps = dispatch => ({
    fetchAllProjects: () => dispatch(fetchAllProjects()),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetail);