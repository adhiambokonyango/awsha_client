import React, {Component} from 'react';
import {FaList} from "react-icons/fa";
import {registerProjects, fetchAllProjects, projectSelect} from "../../store/modules/projects/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class RegisteredProjects extends Component {
    state = {
        data:[],
    };

    componentDidMount() {
        this.props.fetchAllProjects();

    }
    componentDidUpdate(prevProps) {
        if(this.props.registeredProjects !== prevProps.registeredProjects) {
            if(this.props.registeredProjects && this.props.registeredProjects.length > 0) {

                let list = [];

                for(let i = 0;i<this.props.registeredProjects.length;i++) {
                    list.push(<p><dt>
                        <a
                            href="/Project Details Section"
                        >
                            <h6 >
                                <FaList size={4}/>
                                {" " +this.props.registeredProjects[i].ProjectTitle}

                            </h6>
                        </a><br/>
                    </dt>

                    </p>);
                }
                this.setState({data: list});

            }
        }

        if(this.props.projectsSuccessFullyRegistered !== prevProps.projectsSuccessFullyRegistered) {
            if(this.props.projectsSuccessFullyRegistered) {
                this.props.fetchAllProjects();
            }

        }


    };


    render() {
        return (
            <div>
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Registered Project</h3>
                    </div>
                    <div className="panel-body">
                        {this.state.data}

                    </div>
                </div>
            </div>
        );
    }
}

RegisteredProjects.propTypes = {
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
)(RegisteredProjects);