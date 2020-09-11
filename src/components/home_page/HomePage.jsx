import React, {Component} from 'react';
import NavigationBar from "../../views/admin_page/nav_bar/NavigationBar";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {FaCartPlus, FaList, FaMailBulk, FaSignOutAlt, FaUser, FaSignInAlt, FaCircle, FaCogs} from "react-icons/fa";
import './HomePage.css';
import './images/sample.jpg';


class HomePage extends Component {
    render() {
        return (
            <div>
                    <Container>

                      <div class="card">
                          <div class="card-image">
                              <img src={ require('./images/sample.jpg') } />
                              <a class="btn-floating halfway-fab waves-effect waves-light red">
                                  <i class="material-icons"><FaCogs /></i>

                              </a>
                          </div>
                          <div class="card-content">
                              <span class="card-title">Awsha</span>
                              <p>
                                  This product targets project management in government institutions.
                                  Enables quick analysis of project progress.<br/>Modules available in this
                                  project include:
                                  <ul>
                                      <FaCircle size={8}/>{" "}Branches for easy expansion<br/>
                                      <FaCircle size={8}/>{" "}Teams<br/>
                                      <FaCircle size={8}/>{" "}Role Based Access<br/>
                                      <FaCircle size={8}/>{" "}Permission Based Access<br/>
                                      <FaCircle size={8}/>{" "}Data Visualization<br/>
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