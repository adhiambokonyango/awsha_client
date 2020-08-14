import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {updateAdministratorPermissionStatus, fetchAllAdministratorUserPrivileges, resetPrivilegeUpdate} from "../../store/modules/administrator_privileges/actions";
import CheckBox from "../../components/check_box/CheckBox";
import {fetchAllAdministrator} from "../../store/user_management/administrator_sign_up/actions";

class AdministratorManagement extends Component {

    state = {
        permissionStatus:'',
        data: []
    };


    componentDidMount() {
        this.props.fetchAllAdministrator();
        this.props.fetchAllAdministratorUserPrivileges();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.administratorPrivilege !== prevProps.administratorPrivilege) {
            if (this.props.administratorPrivilege && this.props.administratorPrivilege.length > 0) {

                let list = [];

                for (let i = 0; i < this.props.administratorPrivilege.length; i++) {
                    list.push(
                        <p><dt>
                            {" " +this.props.administratorPrivilege[i].FirstName}
                        </dt>

                            <dd className="admin__description-item">

                                <CheckBox label={this.props.administratorPrivilege[i].AdministratorAccessPrivilegeDescription}
                                          handleCheckBoxIsChecked={this.handleCheckBoxClicked}
                                          handleCheckBoxIsUnchecked={this.handleCheckBoxClicked}
                                          checkBoxObject={this.props.administratorPrivilege[i]}
                                          isCheckBoxChecked={this.props.administratorPrivilege[i].AdministratorPermissionStatus === 1}/>
                            </dd><br/>
                        </p>


                    )
                    this.setState({data: list});

                }
            }


        }

        if(this.props.administratorPrivilegeSuccessFullyUpdated !== prevProps.administratorPrivilegeSuccessFullyUpdated) {
            if(this.props.administratorPrivilegeSuccessFullyUpdated) {
                this.props.fetchAllAdministratorUserPrivileges();
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
            ColumnName: "AdministratorUserAccessPrivilegeId",
            ColumnValue: checkBoxObject.AdministratorUserAccessPrivilegeId,
            AdministratorPermissionStatus: checkBoxObject.AdministratorPermissionStatus === 1 ? 0 : 1

        };

        await this.props.updateAdministratorPermissionStatus(payload);
    };


    render() {
        return (
            <div>
                <div className="container user-login-card">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="login-panel panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Administrator Management</h3>
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

AdministratorManagement.propTypes = {
    fetchAllAdministrator: PropTypes.func.isRequired,
    fetchAllAdministratorUserPrivileges: PropTypes.func.isRequired,
    updateAdministratorPermissionStatus: PropTypes.func.isRequired,
    administratorPrivilege: PropTypes.arrayOf(PropTypes.object).isRequired,
    registeredAdministrator: PropTypes.arrayOf(PropTypes.object).isRequired,
    administratorPrivilegeSuccessFullyUpdated: PropTypes.bool.isRequired,
    resetPrivilegeUpdate: PropTypes.func.isRequired,

};


const mapStateToProps = state => ({
    registeredAdministrator: state.administrator_sign_up.registeredAdministrator,
    administratorPrivilege: state.administrator_privileges.administratorPrivilege,
    administratorPrivilegeSuccessFullyUpdated: state.administrator_privileges.privilegeSuccessFullyUpdated
});



const mapDispatchToProps = dispatch => ({
    updateAdministratorPermissionStatus: payload => dispatch(updateAdministratorPermissionStatus(payload)),
    fetchAllAdministrator: () => dispatch(fetchAllAdministrator()),
    fetchAllAdministratorUserPrivileges: () => dispatch(fetchAllAdministratorUserPrivileges()),
    resetPrivilegeUpdate: () => dispatch(resetPrivilegeUpdate())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdministratorManagement);
