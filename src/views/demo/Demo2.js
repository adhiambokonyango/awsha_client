import React, {Component} from 'react';
import {fetchAllObjectives, registerObjectives, setObjective} from "../../store/modules/objectives/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Printer, { print } from 'react-pdf-print'
import {FaCogs, FaList} from "react-icons/fa";
import {registerProjects, fetchAllProjects, setProject} from "../../store/modules/projects/actions";
import '../projects/Projects.css';
import './Demo.css'
import {Container} from "react-bootstrap";
import BarcodeReader from 'react-barcode-reader'

class Demo2 extends Component {
    state = {
        array:[],
        arrays: 'no result',
    }

    handleScan = (data) => {
        this.setState({
            array: data
        })
    }

    handleError = (err) => {
        console.error(err)
    }

    render() {
        return (
            <div >
                <BarcodeReader
                onError={this.handleError}
                onScan={this.handleScan}
                />
                <p>{this.state.arrays}</p>
            </div>
        );
    }
    componentDidMount() {
        this.props.fetchAllObjectives();
        this.props.fetchAllProjects();
    }

    componentDidUpdate(prevProps) {
        if (this.props.registeredProjects !== prevProps.registeredProjects) {
            if (this.props.registeredProjects && this.props.registeredProjects.length > 0) {
                let list = [];
                for (let i = 0; i < this.props.registeredProjects.length; i++) {
                    list.push(<p>
                            <dt>

                                <h1 className="panel-title">
                                    <FaCogs size={8}/>
                                    {" " + this.props.registeredProjects[i].ProjectTitle
                                    + " :" + " " + this.props.registeredProjects[i].ProjectProgress + "%"
                                    }
                                </h1>
                                <p>
                                    {this.props.registeredProjects[i].ProjectDescription}
                                </p>
                                <br/></dt>
                        </p>
                    );
                }
                this.setState({array: list});
            }
        }
    }
}

Demo2.propTypes = {
    fetchAllObjectives: PropTypes.func.isRequired,
    registeredObjectives: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllProjects: PropTypes.func.isRequired,
    registeredProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
    registeredObjectives: state.objectives.registeredObjectives,
    registeredProjects: state.projects.registeredProjects,
});



const mapDispatchToProps = dispatch => ({
    fetchAllObjectives: () => dispatch(fetchAllObjectives()),
    fetchAllProjects: () => dispatch(fetchAllProjects()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Demo2);