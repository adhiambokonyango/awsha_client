import React, {Component} from 'react';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Form,
    Container, Row, Col
} from 'react-bootstrap';
import { FaEdit, FaUser, FaSignOutAlt, FaCartPlus, FaList, FaMailBulk } from "react-icons/fa";
import './NavigationBar.scss'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutTime} from "../../../store/user_management/user_log_in/actions";
import './images/awsha_photo.jpg'

class NavigationBar extends Component {
    state = {
        endTime: ""
    }
    handleLogout=() => {
        const payload = {
            SessionEndDate: this.state.endTime,
        }
        this.props.logoutTime(payload);
        this.setState({
            endTime: new Date().toLocaleString()
        })
        window.location.assign("/")
    }
    render() {
        return (
                <Row className="first_row">
                    <Navbar.Collapse >
                   <Col sm={8} md={8} lg={8}><FaList Awsha  size={25}/></Col>
                            <Nav>
                   <Col sm={1} md={1} lg={1}><FaUser size={25}/></Col>
                   <Col sm={1} md={1} lg={1}><FaMailBulk size={25}/></Col>
                   <Col sm={1} md={1} lg={1}><FaCartPlus size={25}/></Col>
                   <Col  sm={1} md={1} lg={1}>
                       <FaSignOutAlt
                       size={25}
                       onClick={() =>{this.handleLogout()}}
                       />
                   </Col>
                            </Nav>
                        </Navbar.Collapse>
                </Row>
        );
    }
}
NavigationBar.propTypes = {
    logoutTime: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
    logoutTime: payload => dispatch(logoutTime(payload)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBar);