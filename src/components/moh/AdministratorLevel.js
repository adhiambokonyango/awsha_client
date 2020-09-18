import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AdministratorSideBar from "../sidebar/AdministratorSideBar";
import {

    DISPLAY_PROJECTS, DISPLAY_TEAM_MEMBERS, DISPLAY_TEAMS,
} from "../../config/constants/Constants";
import NavigationBar from "../../views/admin_page/nav_bar/NavigationBar";
import AdminPage from "../../views/admin_page/AdminPage";
import { Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {connect} from "react-redux";

class AdministratorLevel extends Component {

    componentWillMount() {
        if (this.props.isOfficeAdministratorLoginSuccessful === false){
            this.props.history.push('/');
        }
    }

    handleSideBareItemClicked = (clickedItem) =>{
        if(clickedItem === DISPLAY_PROJECTS) {
            this.props.history.push('/register_projects');
        } else if(clickedItem === DISPLAY_TEAM_MEMBERS) {
            this.props.history.push('/team_members');
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
                <AdministratorSideBar handleSideBarClicked={this.handleSideBareItemClicked}/>

                <Col sm={8}>
                    <AdminPage />
                </Col>



                <div className="col-sm-8">
                </div>

            </div>


        );
    }
};


AdministratorLevel.propTypes = {

    isOfficeAdministratorLoginSuccessful:PropTypes.bool.isRequired,

};

const mapStateToProps = state => ({

    isOfficeAdministratorLoginSuccessful: state.user_log_in.isOfficeAdministratorLoginSuccessful,

});

const mapDispatchToProps = dispatch => ({


});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdministratorLevel);
