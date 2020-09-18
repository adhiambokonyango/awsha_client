import React, {Component} from 'react';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Form,
    Container, Row, Col

} from 'react-bootstrap';
import { FaEdit, FaUser, FaSignOutAlt, FaCartPlus, FaList, FaMailBulk } from "react-icons/fa";
import './NavigationBar.scss'
import PropTypes from "prop-types";
import {connect} from "react-redux";


class NavigationBar extends Component {

    render() {
        return (
                <Row className="first_row">
                    <Navbar.Collapse >
                   <Col sm={8} md={8} lg={8}><FaList Awsha  size={25}/></Col>
                            <Nav>
                   <Col sm={1} md={1} lg={1}><FaUser size={25}/></Col>
                   <Col sm={1} md={1} lg={1}><FaMailBulk size={25}/></Col>
                   <Col sm={1} md={1} lg={1}><FaCartPlus size={25}/></Col>
                   <Col  sm={1} md={1} lg={1}><FaSignOutAlt
                       size={25}
                       onClick={() =>{ window.location.assign("/")}}
                   /></Col>
                            </Nav>
                        </Navbar.Collapse>
                </Row>
        );
    }
}
NavigationBar.propTypes = {
};
const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBar);