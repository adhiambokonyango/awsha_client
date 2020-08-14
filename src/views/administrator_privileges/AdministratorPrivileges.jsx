import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {updateAdministratorPermissionStatus, fetchAllAdministratorUserPrivileges} from "../../store/modules/administrator_privileges/actions";
import Table from "../../components/table/table_body/Table";


class AdministratorPrivileges extends Component {

    state = {


        tableData: [],
        tableHeaders: {
            AdministratorUserAccessPrivilegeId:'#',
            AdministratorId:'AdministratorId',
            AdministratorUserRoleId:'AdministratorUserRoleId',
            AdministratorAccessPrivilegeDescription:'AdministratorAccessPrivilegeDescription',
            AdministratorPermissionStatus:'AdministratorPermissionStatus',


        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.administratorPrivilege !== prevProps.administratorPrivilege) {
            if(this.props.administratorPrivilege && this.props.administratorPrivilege.length > 0) {

                let teamMembers = this.props.administratorPrivilege.map(
                    (item, index) => {
                        return {
                            id: index + 1,
                            AdministratorId: item.AdministratorId,
                            AdministratorUserRoleId: item.AdministratorUserRoleId,
                            AdministratorAccessPrivilegeDescription: item.AdministratorAccessPrivilegeDescription,
                            AdministratorPermissionStatus: item.AdministratorPermissionStatus,
                        };
                    }
                );

                this.setState({tableData: teamMembers});

            }
        }
    }



    async componentDidMount() {
        this.props.fetchAllAdministratorUserPrivileges();
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
                       tableData={this.props.administratorPrivilege}/>
            </div>
        );
    }
}


AdministratorPrivileges.propTypes = {
    updateAdministratorPermissionStatus: PropTypes.func.isRequired,
    fetchAllAdministratorUserPrivileges: PropTypes.func.isRequired,
    administratorPrivilege: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
    administratorPrivilege: state.administrator_privileges.administratorPrivilege
});



const mapDispatchToProps = dispatch => ({
    updateAdministratorPermissionStatus: payload => dispatch(updateAdministratorPermissionStatus(payload)),
    fetchAllAdministratorUserPrivileges: () => dispatch(fetchAllAdministratorUserPrivileges())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdministratorPrivileges);