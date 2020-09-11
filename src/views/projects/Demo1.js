import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fetchAllProjects} from "../../store/modules/projects/actions";
import {FaList} from "react-icons/fa";


class Tests extends Component {

state = {
    profiles: [
        {name: "Pete Hunt", country: "USA"},
        {name: "Jordan Walke", country: "Australia"}
        ],
    projects: [
        {
            project_id:"",
            project_title: "",
            project_description: "",
            project_progress: ""
        }
    ],
    data: []

};

    componentDidMount() {
        this.props.fetchAllProjects();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.registeredProjects !== prevProps.registeredProjects) {
            if(this.props.registeredProjects && this.props.registeredProjects.length > 0) {
                let i = 0;


                    let array = this.props.registeredProjects.map(function (item,index){
                        return(
                            <ul key={index}>
                                {index}={this.props.registeredProjects[i].ProjectId}
                                {item.project_title}={this.props.registeredProjects[i].ProjectTitle}
                                {item.project_description}={this.props.registeredProjects[i].ProjectDescription}
                                {item.project_progress}={this.props.registeredProjects[i].ProjectProgress}
                            </ul>
                        )
                    });
                    return (
                        {array}
                    )
            }}

        };

projectDisplay (){
    var project = this.state.projects.map(function (item, index){
        return (
            <div key={index}>
                {item.project_title}
            </div>
        )
    })
    return(
        {project}
    )
};

    test (){
        var user = this.state.profiles.map(function (profile, index){
            if (index === 1){
                return (<ul>{profile.name}</ul>)}
            return(
                <div key={index}>
                    <div>Name: {profile.name} {index}</div>
                    <div>Country: {profile.country}</div>
                    <hr/>
                </div>);
        });
        return(<ul>{user}</ul>)
    };

    render() {
        return (
            <div>
                {this.state.projects}
                {this.componentDidUpdate()}
            </div>
        );
    }


};

Tests.propTypes = {
    profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllProjects: PropTypes.func.isRequired,
    registeredProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
    registeredProjects: state.projects.registeredProjects,
});



const mapDispatchToProps = dispatch => ({
    fetchAllProjects: () => dispatch(fetchAllProjects()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tests);