// import React, { Component } from "react";
// import classNames from "classnames";
// import PropTypes from "prop-types";
// import { Route, withRouter } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import { FaCogs, FaCog, FaSearch, FaList } from "react-icons/fa";
// import {
//     REGISTER_ACADEMIC_CLASS_LEVELS, REGISTER_ACTUAL_CLASSES, REGISTER_ACTUAL_LOTS,
//     REGISTER_ACTUAL_TERMS,
//     REGISTER_ACTUAL_WEEKS, REGISTER_CLASS_FEE_STRUCTURES,
//     REGISTER_CLASS_STREAMS, REGISTER_FEE_COMPONENTS, REGISTER_FEE_STRUCTURES,
//     REGISTER_LOT_DESCRIPTION, REGISTER_SYSTEM_USER,
//     REGISTER_TERM_ITERATIONS,
//     REGISTER_WEEK_ITERATIONS,
//     USER_REGISTRATION
// } from "../../views/admin_home/AdminHomeConstants";
// import './AdminSideBar.scss';
//
// class AdminSideBar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       uiElementsCollapsed: true,
//       chartsElementsCollapsed: true,
//       multiLevelDropdownCollapsed: true,
//       thirdLevelDropdownCollapsed: true,
//       brandDropdownCollapsed: true,
//       samplePagesCollapsed: true
//     };
//
//
//   }
//
//
//
//   render() {
//     return (
//       <div className="navbar-default sidebar side-bar__main-body" role="navigation">
//         <button
//           className="navbar-toggle"
//           type="button"
//           data-toggle="colapse"
//           data-target=".navbar-colapse"
//         />
//         <div className="sidebar-nav navbar-collapse collapse">
//           <ul className="nav in" id="side-menu">
//             <li>
//               <div className="input-group custom-search-form">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search..."
//                 />
//                 <span className="input-group-btn">
//                   <button className="btn btn-default" type="button">
//                     <FaSearch />
//                   </button>
//                 </span>
//               </div>
//             </li>
//
//               <li
//                   className={classNames({
//                       active: !this.state.multiLevelDropdownCollapsed
//                   })}
//               >
//                   <a
//                       href=""
//                       onClick={e => {
//                           e.preventDefault();
//                           this.setState({
//                               multiLevelDropdownCollapsed: !this.state
//                                   .multiLevelDropdownCollapsed
//                           });
//                           return false;
//                       }}
//                   >
//                       <FaCogs />
//                       &nbsp;Modules
//                       <span className="fa arrow" />
//                   </a>
//                   <ul
//                       className={classNames({
//                           "nav nav-second-level": true,
//                           collapse: this.state.multiLevelDropdownCollapsed
//                       })}
//                   >
//                       <li className="second-level">
//                           <a
//                               href=""
//                               onClick={e => {
//                                   e.preventDefault();
//                                   this.props.handleSideBarClicked(
//                                       REGISTER_ACADEMIC_CLASS_LEVELS
//                                   );
//                               }}
//                           >
//                               Register Module
//                           </a>
//                       </li>
//
//                       <li className="second-level">
//                           <a
//                               href=""
//                               onClick={e => {
//                                   e.preventDefault();
//                                   this.props.handleSideBarClicked(REGISTER_CLASS_STREAMS);
//                               }}
//                           >
//                               Module Details
//                           </a>
//                       </li>
//
//                       <li className="second-level">
//                           <a
//                               href=""
//                               onClick={e => {
//                                   e.preventDefault();
//                                   this.props.handleSideBarClicked(REGISTER_LOT_DESCRIPTION);
//                               }}
//                           >
//                               Update Module
//                           </a>
//                       </li>
//
//                       <li className="second-level">
//                           <a
//                               href=""
//                               onClick={e => {
//                                   e.preventDefault();
//                                   this.props.handleSideBarClicked(REGISTER_ACTUAL_LOTS);
//                               }}
//                           >
//                               Actual Lots
//                           </a>
//                       </li>
//
//                       <li className="second-level">
//                           <a
//                               href=""
//                               onClick={e => {
//                                   e.preventDefault();
//                                   this.props.handleSideBarClicked(REGISTER_ACTUAL_CLASSES);
//                               }}
//                           >
//                               Actual Classes
//                           </a>
//                       </li>
//
//
//                   </ul>
//               </li>
//
//               <li
//                   className={classNames({
//                       active: !this.state.calenderMultiLevelDropdownCollapsed
//                   })}
//               >
//                   <a
//                       href=""
//                       onClick={e => {
//                           e.preventDefault();
//                           this.setState({
//                               calenderMultiLevelDropdownCollapsed: !this.state
//                                   .calenderMultiLevelDropdownCollapsed
//                           });
//                           return false;
//                       }}
//                   >
//                       <FaCogs />
//                       &nbsp;Teams
//                       <span className="fa arrow" />
//                   </a>
//                   <ul
//                       className={classNames({
//                           "nav nav-second-level": true,
//                           collapse: this.state.calenderMultiLevelDropdownCollapsed
//                       })}
//                   >
//                       <li className="second-level">
//                           <a
//                               href=""
//                               onClick={e => {
//                                   e.preventDefault();
//                                   this.props.handleSideBarClicked(REGISTER_TERM_ITERATIONS);
//                               }}
//                           >
//                               Register Team
//                           </a>
//                       </li>
//
//                       <li className="second-level">
//                           <a
//                               href=""
//                               onClick={e => {
//                                   e.preventDefault();
//                                   this.props.handleSideBarClicked(REGISTER_WEEK_ITERATIONS);
//                               }}
//                           >
//                               Team Details
//                           </a>
//                       </li>
//
//                       <li className="second-level">
//                           <a
//                               href=""
//                               onClick={e => {
//                                   e.preventDefault();
//                                   this.props.handleSideBarClicked(REGISTER_ACTUAL_TERMS);
//                               }}
//                           >
//                               Update Team
//                           </a>
//                       </li>
//
//                       <li className="second-level">
//                           <a
//                               href=""
//                               onClick={e => {
//                                   e.preventDefault();
//                                   this.props.handleSideBarClicked(REGISTER_ACTUAL_WEEKS);
//                               }}
//                           >
//                               Actual Weeks
//                           </a>
//                       </li>
//                   </ul>
//               </li>
//
//               <li
//                   className={classNames({
//                       active: !this.state.userManagementMultiLevelDropdownCollapsed
//                   })}
//               >
//                   <a
//                       href=""
//                       onClick={e => {
//                           e.preventDefault();
//                           this.setState({
//                               feeManagementMultiLevelDropdownCollapsed: !this.state
//                                   .feeManagementMultiLevelDropdownCollapsed
//                           });
//                           return false;
//                       }}
//                   >
//                       <FaCogs />
//                       &nbsp;Projects
//                       <span className="fa arrow" />
//                   </a>
//                   <ul
//                       className={classNames({
//                           "nav nav-second-level": true,
//                           collapse: this.state.feeManagementMultiLevelDropdownCollapsed
//                       })}
//                   >
//
//                       <li className="second-level">
//                           <a
//                               href=""
//                               onClick={e => {
//                                   e.preventDefault();
//                                   this.props.handleSideBarClicked(REGISTER_FEE_COMPONENTS);
//                               }}
//                           >
//                               Register Project
//                           </a>
//                       </li>
//                       <li className="second-level">
//                           <a
//                               href=""
//                               onClick={e => {
//                                   e.preventDefault();
//                                   this.props.handleSideBarClicked(REGISTER_FEE_STRUCTURES);
//                               }}
//                           >
//                               Project Details
//                           </a>
//                       </li>
//
//                       <li className="second-level">
//                           <a
//                               href=""
//                               onClick={e => {
//                                   e.preventDefault();
//                                   this.props.handleSideBarClicked(REGISTER_CLASS_FEE_STRUCTURES);
//                               }}
//                           >
//                               Update Project
//                           </a>
//                       </li>
//
//                   </ul>
//               </li>
//
//
//               <li
//                   className={classNames({
//                       active: !this.state.userManagementMultiLevelDropdownCollapsed
//                   })}
//               >
//                   <a
//                       href=""
//                       onClick={e => {
//                           e.preventDefault();
//                           this.setState({
//                               userManagementMultiLevelDropdownCollapsed: !this.state
//                                   .userManagementMultiLevelDropdownCollapsed
//                           });
//                           return false;
//                       }}
//                   >
//                       <FaCogs />
//                       &nbsp;User Management
//                       <span className="fa arrow" />
//                   </a>
//                   <ul
//                       className={classNames({
//                           "nav nav-second-level": true,
//                           collapse: this.state.userManagementMultiLevelDropdownCollapsed
//                       })}
//                   >
//                       <li className="second-level">
//                           <a
//                               href=""
//                               onClick={e => {
//                                   e.preventDefault();
//                                   this.props.handleSideBarClicked(USER_REGISTRATION);
//                               }}
//                           >
//                               <Link to="/user_registration" >Users Registration</Link>
//                           </a>
//                       </li>
//
//                   </ul>
//               </li>
//           </ul>
//         </div>
//       </div>
//     );
//   }
// }
//
// AdminSideBar.propTypes = {
//   handleSideBarClicked: PropTypes.func.isRequired
// };
//
// export default withRouter(AdminSideBar);
