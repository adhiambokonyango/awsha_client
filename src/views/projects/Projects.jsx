import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {registerProjects, fetchAllProjects, setProject} from "../../store/modules/projects/actions";
import Table from "../../components/table/table_body/Table";
import Select from "react-select";
import NavigationBar from "../admin_page/nav_bar/NavigationBar";
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Form,
    Container, Row, Col
} from 'react-bootstrap';
import {FaCogs, FaList} from "react-icons/fa";
import LinearProgressWithLabel from "../../components/progress_bar/LinearProgressWithLabel";
import './Projects.css';
import Footer from "../../components/footer/Footer";
import SideShow from "../../components/sideshow/SideShow";
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
        }
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
                    <a onClick={() => {this.selected(post)}}>
                        <h6>
                        <ul key={post.id} >
                            {"  "}<FaCogs/>{" "}{post.ProjectTitle}
                        </ul></h6>
                    </a>
                )}
            </ul>
        );
        return (<div>{projectTitle}</div>);
    }
    selected = (projectSelect) => {
        this.props.setProject(projectSelect);
        this.props.history.push('/project_detail');
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
                <Row>
                <div className="login-panel panel panel-default">
                    {/*<div className="panel-heading">*/}
                    {/*    <h3 className="panel-title">Projects</h3>*/}
                    {/*</div>*/}
                    <Col sm={5}>
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
                            </fieldset>
                        </form>
                    </div>
                    </Col>
                </div>
                    <Col sm={12} md={4} lg={4} className="listed_projects">
                        <div className="card">
                            <div className="card-content">
                                <h3 className="panel-title card_header">Registered Projects</h3>
                                <div className="vertical_scroll">
                                    <div className="scrollmenu">
                                        <ul >
                                            {this.blog()}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>

                </Row>
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
};
const mapStateToProps = state => ({
    projectsSuccessFullyRegistered: state.projects.projectsSuccessFullyRegistered,
    registeredProjects: state.projects.registeredProjects,
    projectSelect: state.projects.projectSelect,
});
const mapDispatchToProps = dispatch => ({
    registerProjects: payload => dispatch(registerProjects(payload)),
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    setProject: payload => dispatch(setProject(payload)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Projects);