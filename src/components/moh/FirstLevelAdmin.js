import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AdminSideBar from "../sidebar/AdminSideBar";
import {
    DISPLAY_USER_REGISTRATION_PAGE,
    DISPLAY_COMPANY_REGISTRATION_PAGE,
} from "../../config/constants/Constants";
import NavigationBar from "../../views/admin_page/nav_bar/NavigationBar";

class FirstLevelAdmin extends Component {


    handleSideBareItemClicked = (clickedItem) =>{
        if(clickedItem === DISPLAY_COMPANY_REGISTRATION_PAGE) {
            this.props.history.push('/company_registration');
        } else if(clickedItem === DISPLAY_USER_REGISTRATION_PAGE) {
            this.props.history.push('/register_users');
        }
    };


    render() {
        return (

            <div>
                <NavigationBar />
                <AdminSideBar handleSideBarClicked={this.handleSideBareItemClicked}/>
            </div>
        );
    }
};

export default FirstLevelAdmin
