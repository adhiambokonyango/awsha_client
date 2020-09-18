import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import './Footer.css';
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube} from "react-icons/all";



class Footer extends Component {
    render() {
        return (
            <div>
                   <div className="footer_section">
                       <div className="footer_container ">
                           <Row className="footer_icons ">
                               <Col sm={4} md={4} lg={4}>

                               </Col>
                               <Col sm={1} md={1} lg={1}>
                                   <FaTwitter size={25}/>
                               </Col>
                               <Col sm={1} md={1} lg={1}>
                                   <FaYoutube size={25}/>
                               </Col>
                               <Col sm={1} md={1} lg={1}>
                                   <FaInstagram size={25}/>
                               </Col>
                               <Col sm={1} md={1} lg={1}>
                                   <FaFacebook size={25}/>
                               </Col>
                           </Row>
                       </div>
                   </div>
                <div className="sub_footer">
                    <Row>
                        <h6>copyright 2020</h6>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Footer;