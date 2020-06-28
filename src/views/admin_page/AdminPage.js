import React, {Component} from 'react';
import NavigationBar from "./nav_bar/NavigationBar";

import AdminSideBar from "../../components/sidebar/AdminSideBar";
import {fetchAllProjects} from "../../store/modules/projects/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Progress from 'react-progressbar';
import './AdminPage.scss'
import CheckBoxGroup from "../../components/check_box_group/CheckBoxGroup";
import CheckBox from "../../components/check_box/CheckBox";
import {FormGroup, Input, Label} from "reactstrap";
import ProjectDetails from "../project_details/ProjectDetails";
import 'react-circular-progressbar/dist/styles.css';
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Animation
import { easeQuadInOut } from "d3-ease";
import LinearProgressWithLabel from "../../components/progress_bar/LinearProgressWithLabel";


class AdminPage extends Component {
    state = {
        project_item: [],
        progress: 40,

        project_refs: {
            Number:'#',
            ProjectTitle: 'ProjectTitle',
            ProjectDescription: 'ProjectDescription',
        }
    };

    componentDidMount() {
        this.props.fetchAllProjects();
    };

     componentDidUpdate(prevProps, prevState, snapshot) {
         if(this.props.registeredProjects !== prevProps.registeredProjects) {
             if(this.props.registeredProjects && this.props.registeredProjects.length > 0) {

                 let list = [];

                 for(let i = 0;i<this.props.registeredProjects.length;i++) {
                     list.push(<p><dt><i className="fa fa-check-circle"></i>
                         {" " +this.props.registeredProjects[i].ProjectTitle}
                         <LinearProgressWithLabel value={this.props.progress} />
                     </dt>
                                <dd className="admin__description-item">
                                    {this.props.registeredProjects[i].ProjectDescription}
                                </dd><br/></p>);
                 }
                 this.setState({project_item: list});

             }
         }
     }

    render() {
        return (
            <div className="container">
              <NavigationBar />

                <div className="col-sm-8">
                    <dl>
                        {this.state.project_item}

                    </dl>

                </div>


            </div>
        );
    }
}

AdminPage.propTypes = {

    fetchAllProjects: PropTypes.func.isRequired,
    registeredProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({

    registeredProjects: state.projects.registeredProjects
});



const mapDispatchToProps = dispatch => ({

    fetchAllProjects: () => dispatch(fetchAllProjects())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminPage);