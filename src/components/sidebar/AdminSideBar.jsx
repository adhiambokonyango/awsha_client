import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Route, withRouter } from "react-router-dom";
import { FaCogs, FaSearch, FaList } from "react-icons/fa";
import {
    DISPLAY_COMPANY_REGISTRATION_PAGE,
    DISPLAY_USER_REGISTRATION_PAGE,
    DISPLAY_USER_MANAGEMENT_PAGE,
    DISPLAY_TEAMS,
    DISPLAY_PROJECTS,
    DISPLAY_ADMINISTRATOR_REGISTRATION, DISPLAY_ADMINISTRATOR_MANAGEMENT

} from "../../config/constants/Constants";

import './AdminSideBar.scss';
import {
    fetchAllUserPrivileges,
    resetPrivilegeUpdate,
    updatePermissionStatus
} from "../../store/modules/privileges/actions";
import {fetchAllUser} from "../../store/user_management/user_sign_up/actions";



class AdminSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uiElementsCollapsed: true,
      chartsElementsCollapsed: true,
      multiLevelDropdownCollapsed: true,
      thirdLevelDropdownCollapsed: true,
      brandDropdownCollapsed: true,
      samplePagesCollapsed: true
    };


  }

  handleSubmit = (e)=> {
      e.preventDefault();
      this.props.handleSideBarClicked();
  }


    render() {
    return (
      <div className="navbar-default sidebar side-bar__main-body" role="navigation">
        <button
          className="navbar-toggle"
          type="button"
          data-toggle="colapse"
          data-target=".navbar-colapse"
        />
        <div className="sidebar-nav navbar-collapse collapse">
          <ul className="nav in" id="side-menu">
            <li>
              <div className="input-group custom-search-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">
                    <FaSearch />
                  </button>
                </span>
              </div>
            </li>

             

              <li className="list-class">
                  <a
                      href=""
                      className="side-bar__anchor-text"
                      onClick={e => {
                          e.preventDefault();
                          this.props.handleSideBarClicked(DISPLAY_USER_REGISTRATION_PAGE);
                      }}
                  >
                      <i className="fa fa-dashboard fa-fw" /> &nbsp;User Registration
                  </a>
              </li>


              <li className="list-class">
                  <a
                      href=""
                      className="side-bar__anchor-text"
                      onClick={e => {
                          e.preventDefault();
                          this.props.handleSideBarClicked(DISPLAY_USER_MANAGEMENT_PAGE);
                      }}
                  >
                      <i className="fa fa-dashboard fa-fw" /> &nbsp;User Management
                  </a>
              </li>


              <li className="list-class">
                  <a
                      href=""
                      className="side-bar__anchor-text"
                      onClick={e => {
                          e.preventDefault();
                          this.props.handleSideBarClicked(DISPLAY_ADMINISTRATOR_REGISTRATION);
                      }}
                  >
                      <i className="fa fa-dashboard fa-fw" /> &nbsp;Administrator Registration
                  </a>
              </li>

              <li className="list-class">
                  <a
                      href=""
                      className="side-bar__anchor-text"
                      onClick={e => {
                          e.preventDefault();
                          this.props.handleSideBarClicked(DISPLAY_ADMINISTRATOR_MANAGEMENT);
                      }}
                  >
                      <i className="fa fa-dashboard fa-fw" /> &nbsp;Administrator Management
                  </a>
              </li>

          </ul>
        </div>
      </div>
    );
  }
}

AdminSideBar.propTypes = {
  handleSideBarClicked: PropTypes.func.isRequired
};


export default withRouter(AdminSideBar);
