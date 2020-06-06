import React, {Component} from 'react';
import NavigationBar from "./nav_bar/NavigationBar";
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Form,
    Container, Row, Col

} from 'react-bootstrap';
import {FaCogs, FaList, FaPlusCircle} from "react-icons/fa";
import { Link } from 'react-router-dom'
import AdminSideBar from "../../components/sidebar/AdminSideBar";
import {fetchAllProjects} from "../../store/modules/projects/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import Table from "../../components/table/table_body/Table";
import './AdminPage.scss'


class AdminPage extends Component {
    state = {
        project_item: [],

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
                     list.push(<p><dt>{this.props.registeredProjects[i].ProjectTitle}</dt>
                                <dd>{this.props.registeredProjects[i].ProjectDescription}</dd><br/></p>);
                 }

                 /*let project_list = this.props.registeredProjects.map(
                     (item, index) => {
                         return {
                             id: index + 1,
                             ProjectTitle: item.ProjectTitle,
                             ProjectDescription: item.ProjectDescription,

                         };
                     }
                 );*/

                 this.setState({project_item: list});

             }
         }
     }

    render() {
        return (
            <div className="container">
              <NavigationBar />
              <AdminSideBar />

              <dl className="admin__list">
                  {this.state.project_item}
              </dl>


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