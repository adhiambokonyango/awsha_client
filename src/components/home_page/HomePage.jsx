import React, {Component} from 'react';
import NavigationBar from "../../views/admin_page/nav_bar/NavigationBar";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {FaCartPlus, FaList, FaMailBulk, FaSignOutAlt, FaUser} from "react-icons/fa";

class HomePage extends Component {
    render() {
        return (
            <div>
                <div className="top-bar">
                    <Container>
                        <Row className="first_row">
                            <Navbar.Collapse id="basic-navbar-nav">

                                <Col sm={8}><FaList Awsha  size={25}/></Col>
                                <Nav className="mr-auto">
                                    <Col sm={1}><FaUser size={25}/></Col>
                                    <Col sm={1}><FaMailBulk size={25}/></Col>
                                    <Col sm={1}><FaCartPlus size={25}/></Col>




                                </Nav>
                            </Navbar.Collapse>
                        </Row>

                    </Container>
                </div>
            </div>
        );
    }
}

export default HomePage;