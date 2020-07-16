import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AdminSideBar from "../sidebar/AdminSideBar";
import {
    DISPLAY_USER_REGISTRATION_PAGE,
    DISPLAY_COMPANY_REGISTRATION_PAGE,
    DISPLAY_USER_MANAGEMENT_PAGE,
    DISPLAY_TEAMS,
    DISPLAY_PROJECTS
} from "../../config/constants/Constants";
import NavigationBar from "../../views/admin_page/nav_bar/NavigationBar";
import AdminPage from "../../views/admin_page/AdminPage";
import { Col, Container, Nav, Navbar, Row} from "react-bootstrap";

class FirstLevelAdmin extends Component {


    handleSideBareItemClicked = (clickedItem) =>{
        if(clickedItem === DISPLAY_COMPANY_REGISTRATION_PAGE) {
            this.props.history.push('/company_registration');
        } else if(clickedItem === DISPLAY_USER_MANAGEMENT_PAGE) {
            this.props.history.push('/user_management');
        } else if(clickedItem === DISPLAY_USER_REGISTRATION_PAGE) {
            this.props.history.push('/register_users');
        } else if(clickedItem === DISPLAY_TEAMS) {
            this.props.history.push('/teams');
        } else if(clickedItem === DISPLAY_PROJECTS) {
            this.props.history.push('/register_projects');
        }
    };


    render() {
        return (

            <div>
                <NavigationBar />
                <AdminSideBar handleSideBarClicked={this.handleSideBareItemClicked}/>

                    <Col sm={8}>
                        <AdminPage />
                    </Col>



                <div className="col-sm-8">
                </div>

            </div>


        );
    }
};

export default FirstLevelAdmin
