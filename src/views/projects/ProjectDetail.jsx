import React, {Component} from 'react';
import PropTypes from "prop-types";
import {fetchAllProjects, registerProjects, setProject} from "../../store/modules/projects/actions";
import {connect} from "react-redux";
import {Col, Container, ProgressBar, Row} from "react-bootstrap";
import Objectives from "../objectives/Objectives";
import './ProjectDetail.css';
import {setObjectivePercentage, projectSelectionQuery} from "../../store/modules/objectives/actions";


import {fetchAllObjectives} from "../../store/modules/objectives/actions";
import NavigationBar from "../admin_page/nav_bar/NavigationBar";
import {FaCogs} from "react-icons/fa";
import CheckBox from "../../components/check_box/CheckBox";

class ProjectDetail extends Component {
    state = {
        data: [],
        progress:0,
        array:{},
        animations: false
    };
    componentDidMount() {
        this.props.fetchAllObjectives();
        this.handleProjectId();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if(this.props.registeredObjectives !== prevProps.registeredObjectives) {
        //     if(this.props.registeredObjectives && this.props.registeredObjectives.length > 0) {
        //
        //         let list = [];
        //
        //         for(let i = 0;i<this.props.registeredObjectives.length;i++) {
        //             list.push(<p className="detail_title"><dt>
        //             <input
        //               type="checkbox"
        //               onClick={this.selectedPercentage}
        //             />
        //                 {" " +this.props.registeredObjectives[i].ObjectiveDescription}{":"}
        //                 {" " +this.props.registeredObjectives[i].ObjectivePercentage}{"%"}
        //             </dt>
        //                     <br/>
        //             </p>);
        //         }
        //         this.setState({objectives: list});
        //
        //     }
        // }
        if(this.props.registeredObjectives !== prevProps.registeredObjectives) {
            if(this.props.registeredObjectives && this.props.registeredObjectives.length > 0) {
                for(let i = 0;i<this.props.registeredObjectives.length;i++) {
                    const objectives = (
                        <ul>
                            {this.props.registeredObjectives.reduce(( item) => {
                                    (
                                        this.props.registeredObjectives[item[this.props.registeredObjectives[i].ProjectId]]
                                            =
                                            this.props.registeredObjectives[item[this.props.registeredObjectives[i].ProjectId]]
                                            ||
                                            []).push(item);
                                    return (
                                        item

                                    )
                                }, {})
                            }
                        </ul>
                    )
                    this.setState({
                        array: objectives
                    })
                }
            }
        }

        if(this.props.projectStatusSuccessFullyUpdated !== prevProps.projectStatusSuccessFullyUpdated) {
            if(this.props.projectStatusSuccessFullyUpdated) {
                this.props.resetPrivilegeUpdate();

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

    handleProjectId = () => {
        const { projectSelect} = this.props;
      const payload = {
          ProjectId: projectSelect.ProjectId
      }
        this.props.projectSelectionQuery(payload);
    }

    blog = () => {

            const projectTitle = (
                <ul>
                    {this.props.fetchedProjectObjective.map((post) =>

                        <p key={post.ObjectiveId} className="detail_title">
                            {/*<input*/}
                            {/*    type="checkbox"*/}
                            {/*    id="myCheck"*/}
                            {/*    onClick={() => {*/}
                            {/*        this.selectedPercentage(post.ObjectivePercentage)*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*{" " + post.ObjectiveDescription}:*/}
                            {/*{" " + post.ObjectivePercentage}{"%"}*/}

                            <CheckBox label={" " + post.ObjectiveDescription + ":" + " " + post.ObjectivePercentage + "%"}
                                      handleCheckBoxIsChecked={this.selectedPercentage}
                                      handleCheckBoxIsUnchecked={this.deselectedPercentage}
                                      checkBoxObject={post}
                                      isCheckBoxChecked={false}
                                      id="myCheck"
                            />
                        </p>
                    )}
                </ul>
            );
                 return (<div>{projectTitle}</div>)
    }
    selectedPercentage = (selected) => {
        this.props.setObjectivePercentage(selected.ObjectivePercentage);
        this.theProgress(selected.ObjectivePercentage);
        console.log(selected.ObjectivePercentage);
    }
    theProgress = (selected) => {
        let checkBox = document.getElementById("myCheck");
                    this.setState({
                        progress: selected + this.state.progress
                    })


    }
    deselectedPercentage = (deselected) => {
        this.props.setObjectivePercentage(deselected.ObjectivePercentage);
        this.theDeselection(deselected.ObjectivePercentage);
    }
    theDeselection = (deselected) => {

            this.setState({
                progress: this.state.progress - deselected
            })


    }
    render()
    {
        const { projectSelect} = this.props;

            return (
                <div>
                    <NavigationBar/>
                    <Container>
                        <div className="card">
                            <div className="card-content">

                                <Col sm={12} md={4} lg={6}>
                                    <p className="detail_title">{projectSelect.ProjectTitle}</p>
                                    <ProgressBar
                                        animated={this.state.animations}
                                        now={this.state.progress}
                                        label={ `${this.state.progress}%`}
                                    />
                                    <p>{projectSelect.ProjectDescription}</p>

                                    <h3 className="panel-title ">Register Objectives:</h3>
                                    <Objectives projectSelected={projectSelect.ProjectId}/>

                                </Col>

                                <Col sm={12} md={4} lg={6} className="array">
                                    <div className="vertical_scroll">
                                        <div className="scrollmenu">
                                            {this.blog()}
                                        </div>
                                    </div>
                                </Col>

                            </div>
                        </div>
                    </Container>
                </div>
            );
    }
}
ProjectDetail.propTypes = {
    fetchAllProjects: PropTypes.func.isRequired,
    projectSelect: PropTypes.object.isRequired,
    fetchAllBranchProjects: PropTypes.func.isRequired,
    updateBranchProjectStatus: PropTypes.func.isRequired,
    branch: PropTypes.arrayOf(PropTypes.object).isRequired,
    projectStatusSuccessFullyUpdated: PropTypes.bool.isRequired,
    resetPrivilegeUpdate: PropTypes.func.isRequired,
    registerProjects: PropTypes.func.isRequired,
    registeredProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    registeredObjectives: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllObjectives: PropTypes.func.isRequired,
    setObjectivePercentage: PropTypes.func.isRequired,
    percentageSelect: PropTypes.object.isRequired,
    objectiveSelect: PropTypes.object.isRequired,

    projectSelectionQuery: PropTypes.func.isRequired,
    groupFetch: PropTypes.bool.isRequired,

    fetchedProjectObjective: PropTypes.arrayOf(PropTypes.object).isRequired,
};
const mapStateToProps = state => ({
    projectSelect: state.projects.projectSelect,
    branch: state.branches.branch,
    projectStatusSuccessFullyUpdated: state.branches.projectStatusSuccessFullyUpdated,
    registeredProjects: state.projects.registeredProjects,
    registeredObjectives: state.objectives.registeredObjectives,
    percentageSelect: state.objectives.projectSelect,
    groupFetch: state.objectives.groupFetch,

    fetchedProjectObjective: state.objectives.fetchedProjectObjective,
});
const mapDispatchToProps = dispatch => ({
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    fetchAllObjectives: () => dispatch(fetchAllObjectives()),
    setObjectivePercentage: payload => dispatch(setObjectivePercentage(payload)),
    projectSelectionQuery: payload => dispatch(projectSelectionQuery(payload)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetail);