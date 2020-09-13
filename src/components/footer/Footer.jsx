import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import './Footer.css';


class Footer extends Component {
    render() {
        return (
            <div>
                   <div className="footer_section">
                       <div className="footer_container">
                           <Container>
                               <Row className="footer_row">
                                   <Col sm={12} md={3} lg={3}>
                                       <h1 className="footer_header">HEAD OFFICE</h1>
                                       <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal </p>
                                   </Col>
                                   <Col sm={12} md={3} lg={3}>
                                       <h1 className="footer_header">FACEBOOK FEEDS</h1>
                                       <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal </p>
                                   </Col>
                                   <Col sm={12} md={3} lg={3}>
                                       <h1 className="footer_header">TWITTER FEEDS</h1>
                                       <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal </p>
                                   </Col>
                                   <Col sm={12} md={3} lg={3}>
                                       <h1 className="footer_header">CONTACT US</h1>
                                       <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal </p>
                                   </Col>
                               </Row>
                           </Container>
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