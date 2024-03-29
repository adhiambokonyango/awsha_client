import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {registerProjects, fetchAllProjects, setProject, resetProjectCredentials} from "../../store/modules/projects/actions";
import Select from "react-select";
import NavigationBar from "../admin_page/nav_bar/NavigationBar";
import {
    Row, Col, Container
} from 'react-bootstrap';
import {FaCogs, FaList} from "react-icons/fa";
import './Projects.css';
import {
    fetchAllAdministratorUserPrivileges,
} from "../../store/modules/administrator_privileges/actions";
import '../user_sign_up/SignUp.css';
import {updateBranchProjectStatus, fetchAllBranchProjects, resetPrivilegeUpdate} from '../../store/modules/branch_project/actions';
import { projectSelectionQuery} from "../../store/modules/objectives/actions";



class Projects extends Component {
    state = {
        projectTitle:'',
        projectDescription:'',
        projectProgress:'',
        selectOptions:'',
        data:[],
        tableData: [],
        tableHeaders: {
            ProjectId:'#',
            ProjectTitle:'ProjectTitle',
        },

        projectRegistrationPermission: false,
        errorMessage: ""
    };
    componentDidMount() {
        this.props.fetchAllProjects();
        this.props.fetchAllAdministratorUserPrivileges();
        this.props.fetchAllBranchProjects();
    }
    componentDidUpdate(prevProps) {
         if(this.props.registeredProjects !== prevProps.registeredProjects) {
             if(this.props.registeredProjects && this.props.registeredProjects.length > 0) {
                 let list = [];
                 for(let i = 0;i<this.props.registeredProjects.length;i++) {
                     list.push(<p><dt>
                         <a >
                             <h3 className="panel-title">
                                 <FaList size={4}/>
                             {" " +this.props.registeredProjects[i].ProjectTitle}
                             </h3>
                         </a><br/></dt></p>
                     );
                 }
                 this.setState({data: list});
             }
         }

        for (let j=0; j<this.props.administratorPrivilege.length;j++){
            if (this.props.administratorPrivilege !== prevProps.administratorPrivilege) {
                if (this.props.administratorPrivilege[j].AdministratorAccessPrivilegeId === 2 && this.props.administratorPrivilege[j].AdministratorPermissionStatus === 1) {
                    this.setState({
                        projectRegistrationPermission: true
                    })
                }
            }
        }

         if(this.props.projectsSuccessFullyRegistered !== prevProps.projectsSuccessFullyRegistered) {
             if(this.props.projectsSuccessFullyRegistered) {
                 this.props.fetchAllProjects();
                 this.props.resetPrivilegeUpdate();
             }
         }
     };
    blog = () => {
        const projectTitle = (
            <ul>
                {this.props.registeredProjects.map((post) =>

                    <a onClick={() => {
                        this.selected(post)

                    }}>

                        <h6>
                        <ul key={post.ProjectId} >
                            {"  "}<FaCogs/>{" "}{post.ProjectTitle}
                        </ul></h6>
                    </a>
                )}
            </ul>
        );
        return (<div>{projectTitle}</div>);
    }
    selected = (projectSelected) => {
        this.props.setProject(projectSelected);

        this.props.history.push('/project_detail');

    }


    handleAnyTextFieldTouched = () => {
        this.props.resetProjectCredentials();
        this.setState({ errorMessage: "Access denied!" });
    };
    handleChange = event => {
        if(this.state.projectRegistrationPermission === true){
            let newState = this.state;
            newState[event.target.name] = event.target.value;
            this.setState({
                ...newState
            });
        } else if(this.state.projectRegistrationPermission === false){
            this.handleAnyTextFieldTouched();
        }
    };
    handleSubmit = (e) =>{
        e.preventDefault();
        const payload = {
            ProjectTitle:this.state.projectTitle,
            ProjectDescription:this.state.projectDescription,
            ProjectProgress:this.state.projectProgress,
        };
        this.props.registerProjects(payload);
        this.setState({
            projectTitle:'',
            projectDescription:'',
            projectProgress:''
        });
    };
    render() {
        return (
            <div>
                <NavigationBar />
                <Container>
                    <div className="card">
                        <div className="card-content">
                <Row>
                {/*<div className="login-panel panel panel-default">*/}
                    {/*<div className="panel-heading">*/}
                    {/*    <h3 className="panel-title">Projects</h3>*/}
                    {/*</div>*/}
                    <Col sm={12} md={4} lg={6}>
                        <h3 className="title titles">Projects</h3>
                        <h3 className="panel-title subs">Register Project</h3>
                    <div className="panel-body ">
                        <form
                            action=""
                            method="POST"
                            onSubmit={this.handleSubmit}
                            encType="multipart/form-data"
                        >
                            <fieldset className="form_input">
                                <div className="form-group">
                                     <textarea
                                         name="projectTitle"
                                         cols="20" rows="2"
                                         className="form-control "
                                         placeholder="Title"
                                         value={this.state.projectTitle}
                                         onChange={this.handleChange}
                                         autoFocus
                                         required={true}
                                     >
                                    </textarea>
                                    {/*<input*/}
                                    {/*    name="projectTitle"*/}
                                    {/*    className="form-control"*/}
                                    {/*    placeholder="projectTitle"*/}
                                    {/*    value={this.state.projectTitle}*/}
                                    {/*    type="text"*/}
                                    {/*    onChange={this.handleChange}*/}
                                    {/*    autoFocus*/}
                                    {/*    required={true}*/}
                                    {/*/>*/}
                                </div>
                                <div className="form-group ">
                                    <textarea
                                        name="projectDescription"
                                        cols="50" rows="5"
                                        className="form-control "
                                        placeholder="Description"
                                        value={this.state.projectDescription}
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    >
                                    </textarea>
                                    {/*<input*/}
                                    {/*    name="projectDescription"*/}
                                    {/*    className="form-control description"*/}
                                    {/*    placeholder="projectDescription"*/}
                                    {/*    value={this.state.projectDescription}*/}
                                    {/*    type="text"*/}
                                    {/*    onChange={this.handleChange}*/}
                                    {/*    autoFocus*/}
                                    {/*    required={true}*/}
                                    {/*/>*/}
                                </div>
                                <div className="form-group">
                                    <textarea
                                        name="projectProgress"
                                        cols="5" rows="2"
                                        className="form-control "
                                        placeholder="Progress"
                                        value={this.state.projectProgress}
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    >
                                         </textarea>
                                    {/*<input*/}
                                    {/*    name="projectProgress"*/}
                                    {/*    className="form-control"*/}
                                    {/*    placeholder="projectProgress"*/}
                                    {/*    value={this.state.projectProgress}*/}
                                    {/*    type="text"*/}
                                    {/*    onChange={this.handleChange}*/}
                                    {/*    autoFocus*/}
                                    {/*    required={true}*/}
                                    {/*/>*/}

                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-success btn-block"
                                >
                                    Submit
                                </button>
                                <div className="error_messages">
                                    {this.state.errorMessage}
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    </Col>

                    <Col sm={12} md={4} lg={6} className="array listed_projects">
                                <h3 className="panel-title card_header">Registered Projects</h3>
                                <div className="vertical_scroll">
                                    <div className="scrollmenu">
                                        <ul >
                                            {this.blog()}
                                        </ul>
                                    </div>
                                </div>
                    </Col>
                </Row>
            </div>
        </div>
    </Container>
    </div>
        );
    }
}
Projects.propTypes = {
    registerProjects: PropTypes.func.isRequired,
    projectsSuccessFullyRegistered: PropTypes.bool.isRequired,
    fetchAllProjects: PropTypes.func.isRequired,
    registeredProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    setProject: PropTypes.func.isRequired,
    projectSelect: PropTypes.object.isRequired,
    resetProjectCredentials: PropTypes.func.isRequired,
    administratorPrivilege: PropTypes.arrayOf(PropTypes.object).isRequired,
    branch: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllAdministratorUserPrivileges: PropTypes.func.isRequired,
    fetchAllBranchProjects: PropTypes.func.isRequired,
    projectSelectionQuery: PropTypes.func.isRequired,
    groupFetch: PropTypes.bool.isRequired,
    hasWrongProjectCredentials: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
    projectsSuccessFullyRegistered: state.projects.projectsSuccessFullyRegistered,
    registeredProjects: state.projects.registeredProjects,
    branch: state.branches.branch,
    projectSelect: state.projects.projectSelect,
    administratorPrivilege: state.administrator_privileges.administratorPrivilege,
    groupFetch: state.objectives.groupFetch,
    hasWrongProjectCredentials: state.projects.hasWrongProjectCredentials,
});
const mapDispatchToProps = dispatch => ({
    registerProjects: payload => dispatch(registerProjects(payload)),
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    setProject: payload => dispatch(setProject(payload)),
    fetchAllAdministratorUserPrivileges: () => dispatch(fetchAllAdministratorUserPrivileges()),
    resetProjectCredentials: payload => dispatch(resetProjectCredentials(payload)),
    fetchAllBranchProjects: () => dispatch(fetchAllBranchProjects()),
    projectSelectionQuery: payload => dispatch(projectSelectionQuery(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Projects);