import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {updateAdminPermissionStatus, fetchAllAdminUserPrivileges, resetPrivilegeUpdate} from "../../store/modules/admin_privileges/actions";
import CheckBox from "../../components/check_box/CheckBox";
import {fetchAllAdmin} from "../../store/user_management/admin_sign_up/actions";
import NavigationBar from "./nav_bar/NavigationBar";
import AdminSideBar from "../../components/sidebar/AdminSideBar";

class AdminManagement extends Component {

    state = {
        permissionStatus:'',
        data: []
    };
    // componentWillMount() {
    //     if (this.props.isAdminLoginSuccessful === false){
    //         this.props.history.push('/');
    //     }
    // }
    //
    // componentWillUnmount() {
    //     if (this.props.isAdminLoginSuccessful === true){
    //         this.props.history.push('/');
    //     }
    // }

    componentDidMount() {
        this.props.fetchAllAdmin();
        this.props.fetchAllAdminUserPrivileges();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.adminPrivilege !== prevProps.adminPrivilege) {
            if (this.props.adminPrivilege && this.props.adminPrivilege.length > 0) {

                let list = [];

                for (let i = 0; i < this.props.adminPrivilege.length; i++) {
                    list.push(
                        <p><dt>
                            {" " +this.props.adminPrivilege[i].FirstName}
                        </dt>

                            <dd className="admin__description-item">

                                <CheckBox label={this.props.adminPrivilege[i].AdminAccessPrivilegeDescription}
                                          handleCheckBoxIsChecked={this.handleCheckBoxClicked}
                                          handleCheckBoxIsUnchecked={this.handleCheckBoxClicked}
                                          checkBoxObject={this.props.adminPrivilege[i]}
                                          isCheckBoxChecked={this.props.adminPrivilege[i].AdminPermissionStatus === 1}/>
                            </dd><br/>
                        </p>


                    )
                    this.setState({data: list});

                }
            }


        }

        if(this.props.adminPrivilegeSuccessFullyUpdated !== prevProps.adminPrivilegeSuccessFullyUpdated) {
            if(this.props.adminPrivilegeSuccessFullyUpdated) {
                this.props.fetchAllAdminUserPrivileges();
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
            ColumnName: "AdminUserAccessPrivilegeId",
            ColumnValue: checkBoxObject.AdminUserAccessPrivilegeId,
            AdminPermissionStatus: checkBoxObject.AdminPermissionStatus === 1 ? 0 : 1

        };

        await this.props.updateAdminPermissionStatus(payload);
    };


    render() {
        return (
            <div>
                <NavigationBar />
                <AdminSideBar />
                <div className="container user-login-card">
                    <div className="row">
                        <div className=" col-md-offset-4">
                            <div className="login-panel panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Admin Management</h3>
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

AdminManagement.propTypes = {
    fetchAllAdmin: PropTypes.func.isRequired,
    fetchAllAdminUserPrivileges: PropTypes.func.isRequired,
    updateAdminPermissionStatus: PropTypes.func.isRequired,
    adminPrivilege: PropTypes.arrayOf(PropTypes.object).isRequired,
    registeredAdmin: PropTypes.arrayOf(PropTypes.object).isRequired,
    adminPrivilegeSuccessFullyUpdated: PropTypes.bool.isRequired,
    resetPrivilegeUpdate: PropTypes.func.isRequired,
    isAdminLoginSuccessful:PropTypes.bool.isRequired,

};


const mapStateToProps = state => ({
    registeredAdmin: state.admin_sign_up.registeredAdmin,
    adminPrivilege: state.admin_privileges.adminPrivilege,
    adminPrivilegeSuccessFullyUpdated: state.admin_privileges.adminPrivilegeSuccessFullyUpdated,
    isAdminLoginSuccessful: state.user_log_in.isAdminLoginSuccessful,
});



const mapDispatchToProps = dispatch => ({
    updateAdminPermissionStatus: payload => dispatch(updateAdminPermissionStatus(payload)),
    fetchAllAdmin: () => dispatch(fetchAllAdmin()),
    fetchAllAdminUserPrivileges: () => dispatch(fetchAllAdminUserPrivileges()),
    resetPrivilegeUpdate: () => dispatch(resetPrivilegeUpdate())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminManagement);