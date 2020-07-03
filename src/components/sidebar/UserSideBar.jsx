import React, { Component } from "react";
import PropTypes from "prop-types";
import {  withRouter } from "react-router-dom";
import { FaCogs, FaCog, FaSearch, FaList } from "react-icons/fa";
import {DATA_ENTRY_FORM} from "../../views/user_home/UserHomeConstants";
import { connect } from "react-redux";
import { compose } from 'redux';
import './UserSideBar.scss';
import {getAllCompanyOwners} from "../../store/modules/admin_home/actions";
import {submitGenericSearch} from "../../store/modules/user_home/actions";


class UserSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uiElementsCollapsed: true,
            chartsElementsCollapsed: true,
            multiLevelDropdownCollapsed: true,
            thirdLevelDropdownCollapsed: true,
            brandDropdownCollapsed: true,
            samplePagesCollapsed: true,
            searchKey: '',
            searchKeyHasError: false,

        };


    }

    handleSearchInputFieldTouched = () => {
        this.setState({searchKeyHasError: false});
    };

    handleSearchIconClicked = (e) =>{
        e.preventDefault();
        if(!this.state.searchKey) {
            this.setState({searchKeyHasError: true});
        } else {
            const payload = {
                searchParameter: this.state.searchKey
            };

            this.props.submitGenericSearch(payload);
        }
    };

    handleSearchKeyChange = event => {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState({
            ...newState
        });
    };


    render() {
        return (
            <div
                className="navbar-default sidebar"
                role="navigation"
            >
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
                                    onClick={()=>{this.handleSearchInputFieldTouched();}}
                                    type="text"
                                    name="searchKey"
                                    className={
                                        this.state.searchKeyHasError
                                            ? "form-control sidebar__text-area-error"
                                            : "form-control"
                                    }
                                    placeholder="Search..."
                                    value={this.state.searchKey}
                                    onChange={this.handleSearchKeyChange}
                                    autoFocus
                                />
                                <span className="input-group-btn">
                  <button className="btn btn-default" type="button" onClick={this.handleSearchIconClicked}>
                    <FaSearch />
                  </button>
                </span>
                            </div>
                        </li>

                        <li className="list-class">
                            <a
                                href=""
                                onClick={e => {
                                    e.preventDefault();
                                    this.props.handleSideBarClicked(
                                        DATA_ENTRY_FORM
                                    );
                                }}
                            >
                                <i className="fa fa-dashboard fa-fw" /> &nbsp;Data Entry
                            </a>
                        </li>


                    </ul>
                </div>
            </div>
        );
    }
}

UserSideBar.propTypes = {
    handleSideBarClicked: PropTypes.func.isRequired,
    submitGenericSearch: PropTypes.func.isRequired
};


const mapDispatchToProps = dispatch => ({
    submitGenericSearch: payload => dispatch(submitGenericSearch(payload))
});

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(UserSideBar);
