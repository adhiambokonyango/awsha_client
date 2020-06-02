import React, {Component} from 'react';
import NavigationBar from "./nav_bar/NavigationBar";
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Form,
    Container, Row, Col

} from 'react-bootstrap';
import {FaCogs, FaList, FaPlusCircle} from "react-icons/fa";
import { Link } from 'react-router-dom'

class AdminPage extends Component {
    render() {
        return (
            <Container>
              <NavigationBar />

              <Row>
                  <Col sm={4}>
                  <div className="panel-body">
                      <a href="">
                      <FaCogs />

                          <Link to="/company">&nbsp;Agencies</Link>
                      </a>
                  </div>
                  </Col>
                  <Col sm={4}>
                      <div className="panel-body">
                          <a href="">
                              <FaCogs />
                              <Link to="/teams">&nbsp;Teams</Link>
                          </a>
                      </div>
                  </Col>
              </Row>
                <Row>
                    <Col sm={4}>
                        <div className="panel-body">
                            <a href="">
                                <FaCogs />
                                &nbsp;Projects
                            </a>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="panel-body">
                            <a href="">
                                <FaCogs />
                                &nbsp;Employees
                            </a>
                        </div>
                    </Col>
                    {/*<Col sm={4}>*/}
                    {/*    <div className="panel-body">*/}
                    {/*        <div className="panel-heading">*/}
                    {/*            <strong>Team Members</strong>*/}
                    {/*           </div>*/}
                    {/*    </div>*/}
                    {/*</Col>*/}
                </Row>

            </Container>
        );
    }
}

export default AdminPage;