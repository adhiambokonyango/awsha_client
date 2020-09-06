import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    DISPLAY_OBJECTIVES, DISPLAY_PROJECT_OBJECTIVE


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
        if(clickedItem === DISPLAY_OBJECTIVES) {
            this.props.history.push('/objectives');
        } else if(clickedItem === DISPLAY_PROJECT_OBJECTIVE) {
            this.props.history.push('/register_project_objectives');
        }
    };


    render() {
        return (

            <div>
                <NavigationBar />

                <Col sm={8}>
                    <AdminPage />
                </Col>



                <div className="col-sm-8">
                </div>

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