import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {updatePermissionStatus,  fetchAllUserPrivileges} from "../../store/modules/privileges/actions"
import {fetchAllUser} from "../../store/user_management/user_sign_up/actions";
import CheckBox from "../../components/check_box/CheckBox";
import {resetPrivilegeUpdate} from "../../store/modules/privileges/actions";
class UserManagement extends Component {
    state = {
        data: [],
    };
    componentDidMount() {
        this.props.fetchAllUser();
        this.props.fetchAllUserPrivileges();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.privilege !== prevProps.privilege) {
            if (this.props.privilege && this.props.privilege.length > 0) {
                let list = [];
                for (let i = 0; i < this.props.privilege.length; i++) {
                    list.push(<p><dt>{" " + this.props.privilege[i].FirstName}</dt>
                            <dd className="admin__description-item">
                            <CheckBox label={this.props.privilege[i].AccessPrivilegeDescription}
                                      handleCheckBoxIsChecked={this.handleCheckBoxClicked}
                                      handleCheckBoxIsUnchecked={this.handleCheckBoxClicked}
                                      checkBoxObject={this.props.privilege[i]}
                                      isCheckBoxChecked={this.props.privilege[i].PermissionStatus === 1}/>
                            </dd><br/>
                        </p>
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
            PermissionStatus: checkBoxObject.PermissionStatus === 1 ? 0 : 1

        };
        await this.props.updatePermissionStatus(payload);
    };
    render() {
        return (
            <div>
                <div className="container user-login-card">
                    <div className="row">
                        <div className=" col-md-9">
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
    privilege: PropTypes.arrayOf(PropTypes.object).isRequired,
    registeredUser: PropTypes.arrayOf(PropTypes.object).isRequired,
    privilegeSuccessFullyUpdated: PropTypes.bool.isRequired,
    resetPrivilegeUpdate: PropTypes.func.isRequired,
    isAdminLoginSuccessful:PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
    registeredUser: state.user_sign_up.registeredUser,
    privilege: state.privileges.privilege,
    privilegeSuccessFullyUpdated: state.privileges.privilegeSuccessFullyUpdated,
    isAdminLoginSuccessful: state.user_log_in.isAdminLoginSuccessful,
});
const mapDispatchToProps = dispatch => ({
    updatePermissionStatus: payload => dispatch(updatePermissionStatus(payload)),
    fetchAllUser: () => dispatch(fetchAllUser()),
    fetchAllUserPrivileges: () => dispatch(fetchAllUserPrivileges()),
    resetPrivilegeUpdate: () => dispatch(resetPrivilegeUpdate()),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserManagement);