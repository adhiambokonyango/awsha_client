import React, {Component} from 'react';
import { Columns } from "react-bulma-components/dist";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import Table from "../../components/table/table_body/Table";
import html2pdf from "html2pdf.js";
import { projectSelectionQuery} from "../../store/modules/objectives/actions";
import CheckBox from "../../components/check_box/CheckBox";
import {Col, Container} from "react-bootstrap";
import {FaCircle, FaCogs, FaPrint} from "react-icons/all";
import {projectSelectionQueryForTeams} from "../../store/modules/teams/actions";

class Report extends Component {

    state = {
        tableData: [],
        incompleteTasks:[],
        team:[]
    };

    // componentWillMount() {
    //
    //         this.props.history.push('/register_projects');
    //
    // }

    componentDidMount() {
        this.handleProjectId();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.fetchedProjectObjective !== prevProps.fetchedProjectObjective) {
            if(this.props.fetchedProjectObjective && this.props.fetchedProjectObjective.length > 0) {
                let list = [];
                let inCompleteList =[];
                for(let i = 0;i<this.props.fetchedProjectObjective.length;i++) {
                    if(this.props.fetchedProjectObjective[i].IsCheckBoxChecked === 1){
                        list.push(<p className="detail_title">{" "}
                            <FaCircle size={6}/>
                                {" " + this.props.fetchedProjectObjective[i].ObjectiveDescription + ":" + " " + this.props.fetchedProjectObjective[i].ObjectivePercentage + "%"}
                            </p>
                        )
                    } else if(this.props.fetchedProjectObjective[i].IsCheckBoxChecked === 0){
                        inCompleteList.push(<p className="detail_title">{" "}
                            <FaCircle size={6}/>
                                {" " + this.props.fetchedProjectObjective[i].ObjectiveDescription + ":" + " " + this.props.fetchedProjectObjective[i].ObjectivePercentage + "%"}
                            </p>
                        )
                    }

                    this.setState({
                        tableData: list,
                        incompleteTasks: inCompleteList
                    });
                }
            }
        }

        if(this.props.fetchedProjectTeam !== prevProps.fetchedProjectTeam) {
            if(this.props.fetchedProjectTeam && this.props.fetchedProjectTeam.length > 0) {
                let list = [];
                for(let i = 0;i<this.props.fetchedProjectTeam.length;i++) {
                        list.push(<p className="detail_title">{" "}
                            <FaCircle size={6}/>
                                {" " + this.props.fetchedProjectTeam[i].TeamName}
                            </p>
                        )
                    this.setState({
                        team: list,
                    });
                }
            }
        }
    }

    generatePdf = () => {
        const element = document.getElementById("fee-statement");
        html2pdf()
            .set({ html2canvas: { scale: 8 } })
            .from(element)
            .save();
    };

    printDiv = () =>{
        html2canvas(document
            .getElementById("fee-statement"), {scale: 8,allowTaint: true,useCORS : true})
            .then(canvas => {
            // var link = document.createElement('a');
            // link.download = 'receipt.png';
            // link.href = canvas.toDataURL()
            // link.click();

            var pdf = null;
            if(canvas.width > canvas.height){
                pdf = new jsPDF('l', 'mm', [canvas.width, canvas.height],{
                    orientation: 'landscape',
                    unit: 'in',
                    format: [4, 2]
                });
            }
            else{
                pdf = new jsPDF('p', 'mm', [canvas.height, canvas.width],{
                    orientation: 'landscape',
                    unit: 'in',
                    format: [4, 2]
                });
            }

            //var imgData = canvas.toDataURL()
            pdf.addImage(canvas, 'JPEG', 0, 0);
            pdf.save(" project_report");
        });
    };

    handleProjectId = () => {
        const { projectSelect} = this.props;
        const payload = {
            ProjectId: projectSelect.ProjectId
        }
        this.props.projectSelectionQuery(payload);
        this.props.projectSelectionQueryForTeams(payload);
    }

    render() {
        const { projectSelect, fetchedTeamLead} = this.props;
        return (
            <div className="statement__main-body" id="fee-statement" onClick={()=>{this.printDiv();}}>
                <div className="statement__top-section">
                    <Columns className="is-gapless">
                        <Columns.Column size="one-quarter">
                        </Columns.Column>
                        <Columns.Column>
                            <div className="statement__name-div">
                                <div className="statement__school-details-div">
                                    <h1 className="report_title">{projectSelect.ProjectTitle}</h1><br/>
                                    <div className="statement__motto-prompt">{projectSelect.ProjectDescription}</div><br/>
                                    <div className="statement__motto">Progress: {" " + projectSelect.ProjectProgress + "%"}</div><br/>
                                </div>
                            </div>
                        </Columns.Column>
                        <Columns.Column size="one-quarter">
                        </Columns.Column>
                    </Columns>
                    <h3  className="panel-title "> Completed Tasks:</h3>
                    {this.state.tableData}
                    <h3  className="panel-title "> Incomplete Tasks:</h3>
                    {this.state.incompleteTasks}
                    <h3  className="panel-title "> Teams:</h3>
                    {this.state.team}
                </div>
            </div>
        );
    }
}

Report.propTypes = {
    projectSelect: PropTypes.object.isRequired,
    percentageSelect: PropTypes.object.isRequired,
    fetchedProjectObjective: PropTypes.arrayOf(PropTypes.object).isRequired,
    projectSelectionQuery: PropTypes.func.isRequired,
    groupFetch: PropTypes.bool.isRequired,

    fetchedProjectTeam: PropTypes.arrayOf(PropTypes.object).isRequired,
    projectSelectionQueryForTeams: PropTypes.func.isRequired,
    teamFetch: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    projectSelect: state.projects.projectSelect,
    percentageSelect: state.objectives.projectSelect,
    fetchedProjectObjective: state.objectives.fetchedProjectObjective,
    groupFetch: state.objectives.groupFetch,

    fetchedProjectTeam: state.teams.fetchedProjectTeam,
    teamFetch: state.teams.teamFetch,

});

const mapDispatchToProps = dispatch => ({
    projectSelectionQuery: payload => dispatch(projectSelectionQuery(payload)),

    projectSelectionQueryForTeams: payload => dispatch(projectSelectionQueryForTeams(payload)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Report);
