import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    DISPLAY_OBJECTIVES, DISPLAY_PROJECT_OBJECTIVE, DISPLAY_PROJECTS


} from "../../config/constants/Constants";
import NavigationBar from "../../views/admin_page/nav_bar/NavigationBar";
import AdminPage from "../../views/admin_page/AdminPage";
import { Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import UserSideBar from "../sidebar/UserSideBar";
import {connect} from "react-redux";

class UserLevel extends Component {
    componentWillMount() {
        if (this.props.isLoginSuccessful === false){
            this.props.history.push('/');
        }
    }


    handleSideBareItemClicked = (clickedItem) =>{
        if(clickedItem === DISPLAY_PROJECTS) {
            this.props.history.push('/project_detail');
        }
    };


    render() {
        return (

            <div>
                <NavigationBar />
                <UserSideBar handleSideBarClicked={this.handleSideBareItemClicked}/>
            </div>


        );
    }
};

UserLevel.propTypes = {

    isLoginSuccessful:PropTypes.bool.isRequired,

};

const mapStateToProps = state => ({

    isLoginSuccessful: state.user_log_in.isLoginSuccessful,

});

const mapDispatchToProps = dispatch => ({


});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLevel);