// import React, {Component} from 'react';
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import CheckBox from "../../components/check_box/CheckBox";
// import {updateBranchProjectStatus, fetchAllBranchProjects, resetPrivilegeUpdate} from '../../store/modules/branch_project/actions';
//
// class BranchProject extends Component {
//     state = {
//         data: [],
//     };
//     componentDidMount() {
//         this.props.fetchAllBranchProjects();
//     }
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if (this.props.branch !== prevProps.branch) {
//             if (this.props.branch && this.props.branch.length > 0) {
//                 let list = [];
//                 for (let i = 0; i < this.props.branch.length; i++) {
//                     list.push(<p>
//                             <dd className="admin__description-item">
//                                 <CheckBox label={this.props.branch[i].BranchName}
//                                           handleCheckBoxIsChecked={this.handleCheckBoxClicked}
//                                           handleCheckBoxIsUnchecked={this.handleCheckBoxClicked}
//                                           checkBoxObject={this.props.branch[i]}
//                                           isCheckBoxChecked={this.props.branch[i].BranchProjectStatus === 1}/>
//                             </dd><br/>
//                         </p>
//                     )
//                     this.setState({data: list});
//                 }
//             }
//         }
//         if(this.props.projectStatusSuccessFullyUpdated !== prevProps.projectStatusSuccessFullyUpdated) {
//             if(this.props.projectStatusSuccessFullyUpdated) {
//                 this.props.fetchAllBranchProjects();
//                 this.props.resetPrivilegeUpdate();
//             }
//         }
//     }
//     handleChange = event => {
//         let newState = this.state;
//         newState[event.target.name] = event.target.value;
//         this.setState({
//             ...newState
//         });
//     };
//
//     handleCheckBoxClicked = async (checkBoxObject) =>{
//         const payload = {
//             ColumnName: "BranchProjectId",
//             ColumnValue: checkBoxObject.BranchProjectId,
//             BranchProjectStatus: checkBoxObject.BranchProjectStatus === 1 ? 0 : 1
//         };
//         await this.props.updateBranchProjectStatus(payload);
//     };
//     render() {
//         return (
//             <div>
//                 <div className="container user-login-card">
//                     <div className="row">
//                         <div className=" col-md-9">
//                             <div className="login-panel panel panel-default">
//                                 <div className="panel-heading">
//                                     <h3 className="panel-title">Project Management</h3>
//                                 </div>
//                                 <div className="panel-body">
//                                     {this.state.data}
//                                 </div>
//                             </div>
//
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
//
// BranchProject.propTypes = {
//     fetchAllBranchProjects: PropTypes.func.isRequired,
//     updateBranchProjectStatus: PropTypes.func.isRequired,
//     branch: PropTypes.arrayOf(PropTypes.object).isRequired,
//     projectStatusSuccessFullyUpdated: PropTypes.bool.isRequired,
//     resetPrivilegeUpdate: PropTypes.func.isRequired,
// };
//
//
// const mapStateToProps = state => ({
//     branch: state.branches.branch,
//     projectStatusSuccessFullyUpdated: state.branches.projectStatusSuccessFullyUpdated,
// });
//
//
//
// const mapDispatchToProps = dispatch => ({
//     updateBranchProjectStatus: payload => dispatch(updateBranchProjectStatus(payload)),
//     fetchAllBranchProjects: () => dispatch(fetchAllBranchProjects()),
//     resetPrivilegeUpdate: () => dispatch(resetPrivilegeUpdate()),
//
// });
//
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(BranchProject);