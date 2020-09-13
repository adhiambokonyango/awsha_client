import React, {Component} from 'react';
import './SideShow.css';
import '../../../node_modules/video-react/dist/video-react.css';
import { Player } from 'video-react';

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
                <Player>
                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
                </Player>
                <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </p>
            </div>
        );
    }
}

export default SideShow;