import React, {Component} from 'react';
import PropTypes from "prop-types";
import {fetchAllProjects} from "../../store/modules/projects/actions";
import {connect} from "react-redux";

class ProjectDetail extends Component {
    state = {
        data: ''
    }

    componentDidMount() {
        this.props.fetchAllProjects();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.registeredProjects !== prevProps.registeredProjects){
            for(let i = 0;i<this.props.registeredProjects.length;i++) {
                let listing = this.props.registeredProjects[i].ProjectTitle
                this.setState({
                    data: listing
                })
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.data}
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