import React, {Component} from 'react';

import { connect } from "react-redux";
import Modal from "react-awesome-modal";
import PropTypes from "prop-types";
import {updateAdminPermissionStatus, fetchAllAdminUserPrivileges} from "../../store/modules/admin_privileges/actions";
import Table from "../../components/table/table_body/Table";
import TopBar from "../../components/topbar/TopBar";
import {promiselessApiPost} from "../../services/api_connector/ApiConnector"

class AdminPrivileges extends Component {

    state = {


        tableData: [],
        tableHeaders: {
            AdminUserAccessPrivilegeId:'#',
            AdminId:'AdminId',
            AdminUserRoleId:'AdminUserRoleId',

            AdminAccessPrivilegeDescription:'AdminAccessPrivilegeDescription',
            AdminPermissionStatus:'AdminPermissionStatus',


        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.adminPrivilege !== prevProps.adminPrivilege) {
            if(this.props.adminPrivilege && this.props.adminPrivilege.length > 0) {

                let teamMembers = this.props.privilege.map(
                    (item, index) => {
                        return {
                            id: index + 1,
                            AdminId: item.AdminId,
                            AdminUserRoleId: item.AdminUserRoleId,
                            AdminAccessPrivilegeDescription: item.AdminAccessPrivilegeDescription,
                            AdminPermissionStatus: item.AdminPermissionStatus,
                        };
                    }
                );

                this.setState({tableData: teamMembers});

            }
        }
    }



    async componentDidMount() {
        this.props.fetchAllAdminUserPrivileges();

    }

    handleChange = event => {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState({
            ...newState
        });
    };



    render() {
        return (
            <div>


                <Table tableTitle='Registered Privileges'
                       tableHeaderObject={this.state.tableHeaders}
                       tableData={this.props.adminPrivilege}/>
            </div>
        );
    }
}


AdminPrivileges.propTypes = {
    updateAdminPermissionStatus: PropTypes.func.isRequired,
    fetchAllAdminUserPrivileges: PropTypes.func.isRequired,
    adminPrivilege: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
    adminPrivilege: state.admin_privileges.adminPrivilege
});



const mapDispatchToProps = dispatch => ({
    updateAdminPermissionStatus: payload => dispatch(updateAdminPermissionStatus(payload)),
    fetchAllAdminUserPrivileges: () => dispatch(fetchAllAdminUserPrivileges())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminPrivileges);