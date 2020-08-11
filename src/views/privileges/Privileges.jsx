import React, {Component} from 'react';

import { connect } from "react-redux";
import Modal from "react-awesome-modal";
import PropTypes from "prop-types";
import {updatePermissionStatus, fetchAllUserPrivileges} from "../../store/modules/privileges/actions";
import Table from "../../components/table/table_body/Table";
import TopBar from "../../components/topbar/TopBar";
import {promiselessApiPost} from "../../services/api_connector/ApiConnector"

class Privileges extends Component {

    state = {
        permissionStatus:'',


        tableData: [],
        tableHeaders: {
            UserAccessPrivilegeId:'#',
            UserId:'UserId',
            UserRoleId:'UserRoleId',

            AccessPrivilegeDescription:'AccessPrivilegeDescription',
            PermissionStatus:'PermissionStatus',


        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.privilege !== prevProps.privilege) {
            if(this.props.privilege && this.props.privilege.length > 0) {

                let teamMembers = this.props.privilege.map(
                    (item, index) => {
                        return {
                            id: index + 1,
                            UserId: item.UserId,
                            UserRoleId: item.UserRoleId,
                            AccessPrivilegeDescription: item.AccessPrivilegeDescription,
                            PermissionStatus: item.PermissionStatus,
                        };
                    }
                );

                this.setState({tableData: teamMembers});

            }
        }
    }



    async componentDidMount() {
        this.props.fetchAllUserPrivileges();
        //
        // const payload = {
        //     userId: '10',
        //     roleCode: '1',
        //     accessPrivilegeCode: '22'
        // };
        // const accessPrivileges = await promiselessApiPost(payload,"/get_user_access_privileges_for_particular_role");
        // console.log(accessPrivileges);
    }

    handleChange = event => {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState({
            ...newState
        });
    };

    handleSubmit = (e) =>{
        e.preventDefault();

        const payload = {
            PermissionStatus:this.state.permissionStatus,

        };

        this.props.updatePermissionStatus(payload);
        this.setState({
            permissionStatus:1,
            });
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">user access privileges</h3>
                    </div>
                    <div className="panel-body">
                        <form
                            action=""
                            method="POST"
                            onSubmit={this.handleSubmit}
                            encType="multipart/form-data"
                        >
                            <fieldset>

                            </fieldset>
                        </form>
                    </div>
                </div>

                <Table tableTitle='Registered Privileges'
                       tableHeaderObject={this.state.tableHeaders}
                       tableData={this.props.privilege}/>
            </div>
        );
    }
}


Privileges.propTypes = {
    updatePermissionStatus: PropTypes.func.isRequired,
    fetchAllUserPrivileges: PropTypes.func.isRequired,
    privilege: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
    privilege: state.privileges.privilege
});



const mapDispatchToProps = dispatch => ({
    updatePermissionStatus: payload => dispatch(updatePermissionStatus(payload)),
    fetchAllUserPrivileges: () => dispatch(fetchAllUserPrivileges())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Privileges);