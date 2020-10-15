import React, {Component} from 'react';
import PropTypes from "prop-types";
import {fetchAllProjects, updateProjectProgress} from "../../store/modules/projects/actions";
import {connect} from "react-redux";
import {Col, Container, ProgressBar, Row} from "react-bootstrap";
import Objectives from "../objectives/Objectives";
import './ProjectDetail.css';
import {setObjectivePercentage, projectSelectionQuery, updateIsCheckBoxChecked} from "../../store/modules/objectives/actions";
import {resetPrivilegeUpdate} from "../../store/modules/branch_project/actions";
import {fetchAllObjectives} from "../../store/modules/objectives/actions";
import NavigationBar from "../admin_page/nav_bar/NavigationBar";
import CheckBox from "../../components/check_box/CheckBox";

class ProjectDetail extends Component {
    state = {
        data: [],
        progress:0,
        array:{},
        animations: false,
        checker: '',
        percentage:''

    };
    componentDidMount() {
        this.props.fetchAllObjectives();
        this.handleProjectId();
        this.setState({
            progress: this.props.projectSelect.ProjectProgress
        })

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
        if(this.props.fetchedProjectObjective !== prevProps.fetchedProjectObjective) {
            if(this.props.fetchedProjectObjective && this.props.fetchedProjectObjective.length > 0) {
                let list = [];
                for(let i = 0;i<this.props.fetchedProjectObjective.length;i++) {
                    list.push(<p className="detail_title">
                                <CheckBox label={this.props.fetchedProjectObjective[i].ObjectiveDescription + ":" + " " + this.props.fetchedProjectObjective[i].ObjectivePercentage + "%"}
                                          handleCheckBoxIsChecked={this.selectedPercentage}
                                          handleCheckBoxIsUnchecked={this.selectedPercentage}
                                          checkBoxObject={this.props.fetchedProjectObjective[i]}
                                          isCheckBoxChecked={this.props.fetchedProjectObjective[i].IsCheckBoxChecked === 1}/>
                        </p>
                    )
                    this.setState({data: list});
                }
            }
        }

        if(this.props.projectProgressSuccessFullyUpdated !== prevProps.projectProgressSuccessFullyUpdated) {
            if(this.props.projectProgressSuccessFullyUpdated) {
                this.props.fetchAllObjectives();
                this.props.fetchAllProjects();
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

    // blog = () => {
    //
    //         const projectTitle = (
    //             <ul>
    //                 {this.props.fetchedProjectObjective.map((post) =>
    //
    //                     <p key={post.ObjectiveId} className="detail_title">
    //                         {/*<input*/}
    //                         {/*    type="checkbox"*/}
    //                         {/*    id="myCheck"*/}
    //                         {/*    onClick={() => {*/}
    //                         {/*        this.selectedPercentage(post.ObjectivePercentage)*/}
    //                         {/*    }}*/}
    //                         {/*/>*/}
    //                         {/*{" " + post.ObjectiveDescription}:*/}
    //                         {/*{" " + post.ObjectivePercentage}{"%"}*/}
    //
    //                         <CheckBox label={" " + post.ObjectiveDescription + ":" + " " + post.ObjectivePercentage + "%"}
    //                                   handleCheckBoxIsChecked={this.theProgress}
    //                                   handleCheckBoxIsUnchecked={this.theProgress}
    //                                   checkBoxObject={post}
    //                                   isCheckBoxChecked={false}
    //                                   id="myCheck"
    //                         />
    //                     </p>
    //                 )}
    //             </ul>
    //         );
    //              return (<div>{projectTitle}</div>)
    // }
    selectedPercentage = async (selected) => {
        await this.props.setObjectivePercentage(selected);
        const checkBox = {
            ColumnName: "ObjectiveId",
            ColumnValue: selected.ObjectiveId,
            IsCheckBoxChecked: selected.IsCheckBoxChecked === 1 ? 0 : 1
        }
        this.props.updateIsCheckBoxChecked(checkBox);

        if(selected.IsCheckBoxChecked === 0){
            this.setState({
                progress: selected.ObjectivePercentage + this.state.progress,

            })
            const payload = {
                ColumnName: "ProjectId",
                ColumnValue: this.props.projectSelect.ProjectId,
                ProjectProgress: this.state.progress

            };
            this.props.updateProjectProgress(payload);
        }
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
                                        max={100}
                                        min={0}
                                    />
                                    <p>{projectSelect.ProjectDescription}</p>

                                    <h3 className="panel-title ">Register Objectives:</h3>
                                    <Objectives projectSelected={projectSelect.ProjectId}/>

                                </Col>

                                <Col sm={12} md={4} lg={6} className="array">
                                    <div className="vertical_scroll">
                                        <div className="scrollmenu">
                                            {this.state.data}

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

    updateProjectProgress: PropTypes.func.isRequired,
    projectProgressSuccessFullyUpdated: PropTypes.bool.isRequired,

    updateIsCheckBoxChecked: PropTypes.func.isRequired,
    isCheckBoxCheckedSuccessFullyUpdated: PropTypes.bool.isRequired,
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

    projectProgressSuccessFullyUpdated: state.projects.projectProgressSuccessFullyUpdated,

    isCheckBoxCheckedSuccessFullyUpdated: state.objectives.isCheckBoxCheckedSuccessFullyUpdated,
});
const mapDispatchToProps = dispatch => ({
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    fetchAllObjectives: () => dispatch(fetchAllObjectives()),
    setObjectivePercentage: payload => dispatch(setObjectivePercentage(payload)),
    projectSelectionQuery: payload => dispatch(projectSelectionQuery(payload)),
    updateProjectProgress: payload => dispatch(updateProjectProgress(payload)),
    resetPrivilegeUpdate: () => dispatch(resetPrivilegeUpdate()),
    updateIsCheckBoxChecked: payload => dispatch(updateIsCheckBoxChecked(payload)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetail);