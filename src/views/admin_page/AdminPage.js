import React, {Component} from 'react';
import NavigationBar from "./nav_bar/NavigationBar";

import AdminSideBar from "../../components/sidebar/AdminSideBar";
import {fetchAllProjects} from "../../store/modules/projects/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import Progress from 'react-progressbar';
import './AdminPage.scss'
import CheckBoxGroup from "../../components/check_box_group/CheckBoxGroup";
import CheckBox from "../../components/check_box/CheckBox";
import {FormGroup, Input, Label} from "reactstrap";
import 'react-circular-progressbar/dist/styles.css';

import "react-circular-progressbar/dist/styles.css";

// Animation
import { easeQuadInOut } from "d3-ease";
import LinearProgressWithLabel from "../../components/progress_bar/LinearProgressWithLabel";
import { fetchAllProjectObjectives} from "../../store/modules/project_objectives/actions";


class AdminPage extends Component {
    state = {
        project: [],
        progress: 40,

        project_refs: {
            Number:'#',
            ProjectTitle: 'ProjectTitle',
            ProjectDescription: 'ProjectDescription',
        }
    };

    componentDidMount() {
        this.props.fetchAllProjects();
        this.props.fetchAllProjectObjectives();

    };

     componentDidUpdate(prevProps, prevState, snapshot) {
         if(this.props.registeredProjectObjectives !== prevProps.registeredProjectObjectives) {
             if(this.props.registeredProjectObjectives && this.props.registeredProjectObjectives.length > 0) {

                 let list = [];

                 for(let i = 0;i<this.props.registeredProjectObjectives.length;i++) {
                     list.push(<p><dt><i className="fa fa-circle"></i>
                         {" " +this.props.registeredProjectObjectives[i].ProjectId}
                         <LinearProgressWithLabel value={this.props.progress} />
                     </dt>
                                <dd className="admin__description-item">

                                    <RadioButton >
                                        {this.props.registeredProjectObjectives[i].ObjectiveId}
                                    </RadioButton>

                                </dd><br/>
                     </p>);
                 }
                 this.setState({project: list});

             }
         }


     }



    render() {
        return (
            <div className="container">
              <NavigationBar />

                <div className="col-sm-8">
                    <dl>

                        {this.state.project}


                    </dl>

                </div>


            </div>
        );
    }
}

AdminPage.propTypes = {

    fetchAllProjects: PropTypes.func.isRequired,
    registeredProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllProjectObjectives: PropTypes.func.isRequired,
    registeredProjectObjectives: PropTypes.arrayOf(PropTypes.object).isRequired,

};


const mapStateToProps = state => ({

    registeredProjects: state.projects.registeredProjects,
    registeredProjectObjectives: state.project_objectives.registeredProjectObjectives,

});



const mapDispatchToProps = dispatch => ({

    fetchAllProjects: () => dispatch(fetchAllProjects()),
    fetchAllProjectObjectives: () => dispatch(fetchAllProjectObjectives()),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminPage);