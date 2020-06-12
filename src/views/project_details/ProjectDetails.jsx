import React, {Component} from 'react';
import {FormGroup, Input, Label} from "reactstrap";
import {fetchAllProjectObjectives, registerProjectObjectives} from "../../store/modules/project_objectives/actions";
import PropTypes from "prop-types";
import {fetchAllProjects} from "../../store/modules/projects/actions";
import {connect} from "react-redux";

class ProjectDetails extends Component {

    state = {
        isDone: false,
        unDone: true,
        objectives: [],

    };

    componentDidMount() {
        this.props.fetchAllProjectObjectives();
    }

    componentDidUpdate(prevProps) {
        /* ---------------------------------------------------------------------------------------------------------------------- */


        if(this.props.registeredProjectObjectives !== prevProps.registeredProjectObjectives) {
            if(this.props.registeredProjectObjectives && this.props.registeredProjectObjectives.length > 0) {

                let list = [];

                for(let i = 0;i<this.props.registeredProjectObjectives.length;i++) {
                    list.push(<p><dt>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="radio"
                                    name="radio1"
                                    checked={this.state.isDone}
                                    onClick={this.handleAdminRadioClicked}
                                />{" "}
                                {" " +this.props.registeredProjectObjectives[i].ProjectObjective}
                            </Label>
                        </FormGroup>
                    </dt><br/></p>);
                }

                this.setState({objectives: list});

            }
        }

        /*PAGE NAVIGATION LOGIC*/
            if (this.props.isSessionActive && this.state.isAdmin) {
                this.props.getAllUsers();
                this.props.history.push("/admin_home");
            } else if (this.props.isSessionActive && this.state.isStaff) {
                this.props.history.push("/staff_home");
            }
        /* ---------------------------------------------------------------------------------------------------------------------- */




    }


        handleAdminRadioClicked = () => {
        if (this.state.unDone) {
            this.setState({ unDone: false });
        }
        this.setState({ isDone: true });
    };


    render() {
        return (
            <div>
                {this.state.objectives}
            </div>
        );
    }
}

ProjectDetails.propTypes = {
    fetchAllProjectObjectives: PropTypes.func.isRequired,
    registeredProjectObjectives: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
    registeredProjectObjectives: state.project_objectives.registeredProjectObjectives,

});



const mapDispatchToProps = dispatch => ({
    fetchAllProjectObjectives: () => dispatch(fetchAllProjectObjectives()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetails);