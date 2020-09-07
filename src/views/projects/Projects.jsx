import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {registerProjects, fetchAllProjects, projectSelect} from "../../store/modules/projects/actions";
import Table from "../../components/table/table_body/Table";
import Select from "react-select";
import NavigationBar from "../admin_page/nav_bar/NavigationBar";
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Form,
    Container, Row, Col

} from 'react-bootstrap';
import {FaList} from "react-icons/fa";
import LinearProgressWithLabel from "../../components/progress_bar/LinearProgressWithLabel";
import RegisteredProjects from "./RegisteredProjects";


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
                         <a
                             href="/Project Details Section"
                         >
                             <h3 className="panel-title">
                                 <FaList size={4}/>
                             {" " +this.props.registeredProjects[i].ProjectTitle}

                             </h3>
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

                <div className="login-panel panel panel-default">
                    <Row>
                    <div className="panel-heading">
                        <h3 className="panel-title">Projects</h3>
                    </div>

                    <Col sm={7}>

                    <div className="panel-body">
                        <form
                            action=""
                            method="POST"
                            onSubmit={this.handleSubmit}
                            encType="multipart/form-data"
                        >
                            <fieldset>



                                <div className="form-group">
                                    <input
                                        name="projectTitle"
                                        className="form-control"
                                        placeholder="projectTitle"
                                        value={this.state.projectTitle}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        name="projectDescription"
                                        className="form-control"
                                        placeholder="projectDescription"
                                        value={this.state.projectDescription}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                </div>

                                <div className="form-group">
                                    <input
                                        name="projectProgress"
                                        className="form-control"
                                        placeholder="projectProgress"
                                        value={this.state.projectProgress}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

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

                    <Col sm={5}>

                        <RegisteredProjects />
                    </Col>
                    </Row>
                </div>
            </div>
        );
    }
}


Projects.propTypes = {
    registerProjects: PropTypes.func.isRequired,
    projectsSuccessFullyRegistered: PropTypes.bool.isRequired,
    fetchAllProjects: PropTypes.func.isRequired,
    registeredProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    projectSelect: PropTypes.func.isRequired,
    project_session_details: PropTypes.object.isRequired

};


const mapStateToProps = state => ({
    projectsSuccessFullyRegistered: state.projects.projectsSuccessFullyRegistered,
    registeredProjects: state.projects.registeredProjects,
    project_session_details: state.projects.project_session_details

});



const mapDispatchToProps = dispatch => ({
    registerProjects: payload => dispatch(registerProjects(payload)),
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    projectSelect: () => dispatch(projectSelect()),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Projects);