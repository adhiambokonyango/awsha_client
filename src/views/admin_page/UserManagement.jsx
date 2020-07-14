import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormGroup, Label, Input } from "reactstrap";
import {updatePermissionStatus, fetchAllRegisteredUsers, fetchAllUserPrivileges} from "../../store/modules/authenticate/actions"
import {fetchAllUser} from "../../store/modules/sign_up/actions";
import LinearProgressWithLabel from "../../components/progress_bar/LinearProgressWithLabel";
import {RadioButton} from "react-radio-buttons";
import CheckBox from "../../components/check_box/CheckBox";
import {resetPrivilegeUpdate} from "../../store/modules/privileges/actions";


class UserManagement extends Component {

    state = {
       permissionStatus:'',
        data: []
    };


    componentDidMount() {
        this.props.fetchAllUser();
        this.props.fetchAllUserPrivileges();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.privileges !== prevProps.privileges) {
            if (this.props.privileges && this.props.privileges.length > 0) {

                let list = [];

                for (let i = 0; i < this.props.privileges.length; i++) {
                    list.push(

                        <CheckBox label={this.props.privileges[i].AccessPrivilegeId} handleCheckBoxIsChecked={this.handleCheckBoxClicked} handleCheckBoxIsUnchecked={this.handleCheckBoxClicked} checkBoxObject={this.props.privileges[i]} isCheckBoxChecked={this.props.privileges[i].PermisionStatus === 1 ? true : false}/>
                    )
                    this.setState({data: list});

                }
            }


        }

        if(this.props.privilegeSuccessFullyUpdated !== prevProps.privilegeSuccessFullyUpdated) {
            if(this.props.privilegeSuccessFullyUpdated) {
                this.props.fetchAllUserPrivileges();
                this.props.resetPrivilegeUpdate();
            }

        }
    }






    handleChange = event => {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState({
            ...newState
        });
    };

    handleCheckBoxClicked = async (checkBoxObject) =>{

        const payload = {
            ColumnName: "UserAccessPrivilegeId",
            ColumnValue: checkBoxObject.UserAccessPrivilegeId,
            PermisionStatus: checkBoxObject.PermisionStatus === 1 ? 0 : 1

        };

        await this.props.updatePermissionStatus(payload);
    };


    render() {
        return (
            <div>
                <div className="container user-login-card">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="login-panel panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">User Management</h3>
                                </div>
                                <div className="panel-body">
                                    {this.state.data}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserManagement.propTypes = {
    fetchAllUser: PropTypes.func.isRequired,
    fetchAllUserPrivileges: PropTypes.func.isRequired,
    updatePermissionStatus: PropTypes.func.isRequired,
    privileges: PropTypes.arrayOf(PropTypes.object).isRequired,
    registeredUser: PropTypes.arrayOf(PropTypes.object).isRequired,
    privilegeSuccessFullyUpdated: PropTypes.bool.isRequired,
    resetPrivilegeUpdate: PropTypes.func.isRequired,

};


const mapStateToProps = state => ({
    registeredUser: state.sign_up.registeredUser,
    privileges: state.authenticate.privileges,
    privilegeSuccessFullyUpdated: state.privileges.privilegeSuccessFullyUpdated
});



const mapDispatchToProps = dispatch => ({
    updatePermissionStatus: payload => dispatch(updatePermissionStatus(payload)),
    fetchAllUser: () => dispatch(fetchAllUser()),
    fetchAllUserPrivileges: () => dispatch(fetchAllUserPrivileges()),
    resetPrivilegeUpdate: () => dispatch(resetPrivilegeUpdate())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserManagement);