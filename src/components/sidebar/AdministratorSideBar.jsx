import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Route, withRouter } from "react-router-dom";
import { FaCogs, FaCog, FaSearch, FaList } from "react-icons/fa";
import {
    DISPLAY_PROJECTS, DISPLAY_TEAM_MEMBERS

} from "../../config/constants/Constants";

import './AdministratorSideBar.scss';

class AdministratorSideBar extends Component {
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
                                    this.props.handleSideBarClicked(DISPLAY_PROJECTS);
                                }}
                            >
                                <i className="fa fa-dashboard fa-fw" /> &nbsp;Projects
                            </a>
                        </li>

                        <li className="list-class">
                            <a
                                href=""
                                className="side-bar__anchor-text"
                                onClick={e => {
                                    e.preventDefault();
                                    this.props.handleSideBarClicked(DISPLAY_TEAM_MEMBERS);
                                }}
                            >
                                <i className="fa fa-dashboard fa-fw" /> &nbsp;Team Members
                            </a>
                        </li>



                    </ul>
                </div>
            </div>
        );
    }
}

AdministratorSideBar.propTypes = {
    handleSideBarClicked: PropTypes.func.isRequired
};

export default withRouter(AdministratorSideBar);
