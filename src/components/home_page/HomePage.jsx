import React, {Component} from 'react';
import NavigationBar from "../../views/admin_page/nav_bar/NavigationBar";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {FaCartPlus, FaList, FaMailBulk, FaSignOutAlt, FaUser, FaSignInAlt, FaCircle, FaCogs} from "react-icons/fa";
import './HomePage.css';
import './images/awsha_photo.jpg';
import Progress from 'react-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "react-circular-progressbar/dist/styles.css";
import LinearProgressWithLabel from "../progress_bar/LinearProgressWithLabel";


class HomePage extends Component {
    state ={
        progress: 0
    }
    render() {
        return (
            <div>
                    <Container>

                      <div class="card">
                          <div class="card-image img">

                              <img src={ require('./images/awsha_photo.jpg') } />
                              <a
                                  class="btn-floating halfway-fab waves-effect waves-light red"
                                  href="/log in"
                              >
                                  <i class="material-icons"><FaSignInAlt /></i>

                              </a>
                          </div>
                          <div class="card-content">
                              <Row className="rows">
                                  <p>
                                      7TH October, 2020
                                  </p>
                                      <span className="card-title">

                                          <Col sm={12} md={2} lg={2}>

                                          K'onyango
                                              </Col>
                                          <Col sm={12} md={2} lg={2}>
                                              20.02
                                  </Col>

                                      </span>

                              </Row>

                              <p>
                                  This product targets project management in government institutions.
                                  Enables quick analysis of project progress.<br/>Modules available in this
                                  project include:
                                  <ul>
                                      <Col sm={3} md={3} lg={3}>
                                          <FaCircle size={8}/>{" "}Branches and Teams
                                      </Col>
                                      <Col sm={3} md={3} lg={3}>
                                          <FaCircle size={8}/>{" "}Role and Permission Based Access<br/>
                                      </Col>
                                      <Col sm={3} md={3} lg={3}>
                                          <FaCircle size={8}/>{" "}Data Visualization
                                      </Col>
                                      <Col sm={3} md={3} lg={3}>
                                          <FaCircle size={8}/>{" "}Reports
                                      </Col>
                                  </ul>

                              </p>
                          </div>
                      </div>

                    </Container>
            </div>
        );
    }
}

export default HomePage;
