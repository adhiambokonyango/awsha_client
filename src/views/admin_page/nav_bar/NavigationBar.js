import React, {Component} from 'react';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Form,
    Container, Row, Col

} from 'react-bootstrap';
import { FaEdit, FaUser, FaSignOutAlt, FaCartPlus, FaList, FaMailBulk } from "react-icons/fa";
import { Router, Route } from 'react-router'
import TopBar from "../../../components/topbar/TopBar";
import { Link } from 'react-router-dom'
import './NavigationBar.scss'

class NavigationBar extends Component {
    render() {
        return (
            <div className="top-bar">
            <Container>
                <Row className="first_row">
                    <Navbar.Collapse id="basic-navbar-nav">

                   <Col sm={8}><FaList Awsha  size={25}/></Col>
                            <Nav className="mr-auto">
                    <Col sm={1}><FaUser size={25}/></Col>
                    <Col sm={1}><FaMailBulk size={25}/></Col>
                   <Col sm={1}><FaCartPlus size={25}/></Col>
                    <Col sm={1}><FaSignOutAlt size={25}/></Col>
                            </Nav>
                        </Navbar.Collapse>
                </Row>

            </Container>
            </div>

        );
    }
}

export default NavigationBar;


// <Navbar bg="light" expand="lg">
//     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="mr-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#link">Link</Nav.Link>
//             <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//                 <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//                 <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//                 <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//             </NavDropdown>
//         </Nav>
//         <Form inline>
//             <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//             <Button variant="outline-success">Search</Button>
//         </Form>
//     </Navbar.Collapse>
// </Navbar>