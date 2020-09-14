import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fetchAllProjects} from "../store/modules/projects/actions";
import {FaList} from "react-icons/fa";


class Tests extends Component {

state = {
    profiles: [
        {name: "Pete Hunt", country: "USA"},
        {name: "Jordan Walke", country: "Australia"}
        ],
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
                {this.test()}
            </div>
        );
    }


};

Tests.propTypes = {
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