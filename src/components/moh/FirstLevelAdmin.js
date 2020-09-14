import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AdminSideBar from "../sidebar/AdminSideBar";
import {
    DISPLAY_USER_REGISTRATION_PAGE,
    DISPLAY_COMPANY_REGISTRATION_PAGE,
    DISPLAY_USER_MANAGEMENT_PAGE,
    DISPLAY_TEAMS,
    DISPLAY_PROJECTS,
    DISPLAY_ADMINISTRATOR_REGISTRATION, DISPLAY_ADMINISTRATOR_MANAGEMENT
} from "../../config/constants/Constants";
import NavigationBar from "../../views/admin_page/nav_bar/NavigationBar";
import { Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {connect} from "react-redux";
import Footer from "../footer/Footer";
import SideShow from "../sideshow/SideShow";

class FirstLevelAdmin extends Component {

    componentWillMount() {
        if (this.props.isAdminLoginSuccessful === false){
            this.props.history.push('/');
        }
    }

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
        } else if(clickedItem === DISPLAY_ADMINISTRATOR_REGISTRATION) {
            this.props.history.push('/register_administrator');
        } else if(clickedItem === DISPLAY_ADMINISTRATOR_MANAGEMENT) {
            this.props.history.push('/administrator_management');
        }
    };

    render() {
        return (
            <div>
                <NavigationBar />

                <Row>
                    <AdminSideBar handleSideBarClicked={this.handleSideBareItemClicked}/>
                    <Col sm={12} md={6} lg={6}>
                        <div className="card">

                        </div>
                    </Col>
                    <Col sm={12} md={2} lg={2}>
                        <SideShow/>
                    </Col>
                </Row>
                <Footer/>
            </div>
        );
    }
};

FirstLevelAdmin.propTypes = {
    isAdminLoginSuccessful:PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isAdminLoginSuccessful: state.user_log_in.isAdminLoginSuccessful,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FirstLevelAdmin);
