import React, {Component} from 'react';
import './SideShow.css';
import '../../../node_modules/video-react/dist/video-react.css';
import { Player } from 'video-react';
import './images/awsha_photo.jpg'
import {Row} from "react-bootstrap";

class SideShow extends Component {
    state = {
        video: false
    }
    componentDidMount() {
       if (this.props.playing){
           this.setState({
               video: true
           })
       }
    }

    render() {
        return (
            <div className="sideshow">
                <Row>
                    <Player>
                        <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
                    </Player>
                </Row>
                <Row className="showcase_areas">
                        <h1 className="statement">Awsha</h1>
                    <p className="slang">This product targets project management in government institutions.
                        Enables quick analysis of project progress.</p>
                </Row>
            </div>
        );
    }
}

export default SideShow;