import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {fetchAllSystemAdmin, registerSystemAdmin} from "../../store/modules/system_admin/actions";
import Table from "../../components/table/table_body/Table";


class SystemAdmin extends Component {

    state = {
        adminFirstName: "",
        adminMiddleName: "",
        adminSurname: "",
        adminPhoneNumber: "",
        adminEmail: "",
        genderId: "",
        adminNationalId: "",
        encryptedPassword: "",


        tableData: [],
        tableHeaders: {
            AdminId:'#',
            AdminFirstName: "AdminFirstName",
            AdminMiddleName: "AdminMiddleName",
            AdminSurname: "AdminSurname",
            AdminPhoneNumber: "AdminPhoneNumber",
            AdminEmail: "AdminEmail",
            GenderId: "GenderId",
            AdminNationalId: "AdminNationalId",
            EncryptedPassword: "EncryptedPassword",


        }
    };


    componentDidMount() {
        this.props.fetchAllSystemAdmin();
    }

    // componentDidUpdate(prevProps) {
    //     if(this.props.registeredChildrenTips !== prevProps.registeredChildrenTips) {
    //         if(this.props.registeredChildrenTips.length > 0) {
    //             let allregisteredChildrenTips = this.props.registeredChildrenTips;
    //
    //             allregisteredChildrenTips = allregisteredChildrenTips.map(item => {
    //                 return {
    //                     label: item.registeredChildrenTips,
    //                     value: item.CompanyId
    //                 };
    //             });
    //             this.setState({ AllCompanies: allregisteredChildrenTips });
    //         }
    //     }
    // };



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

            AdminFirstName: this.state.adminFirstName,
            AdminMiddleName: this.state.adminMiddleName,
            AdminSurname: this.state.adminSurname,
            AdminPhoneNumber: this.state.adminPhoneNumber,
            AdminEmail: this.state.adminEmail,
            GenderId: this.state.genderId,
            AdminNationalId: this.state.adminNationalId,
            EncryptedPassword: this.state.encryptedPassword,


        };

        this.props.registerSystemAdmin(payload);
        this.setState({
            adminFirstName: "",
            adminMiddleName: "",
            adminSurname: "",
            adminPhoneNumber: "",
            adminEmail: "",
            genderId: "",
            adminNationalId: "",
            encryptedPassword: "",

        });
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Register System Admin</h3>
                    </div>
                    <div className="panel-body">
                        <form
                            action=""
                            method="POST"
                            onSubmit={this.handleSubmit}
                            encType="multipart/form-data"
                        >
                            <fieldset>
                                <div className="form-group">
                                    <input
                                        name="adminFirstName"
                                        className="form-control"
                                        placeholder="adminFirstName"
                                        value={this.state.adminFirstName}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                    <input
                                        name="adminMiddleName"
                                        className="form-control"
                                        placeholder="adminMiddleName"
                                        value={this.state.adminMiddleName}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                    <input
                                        name="adminSurname"
                                        className="form-control"
                                        placeholder="adminSurname"
                                        value={this.state.adminSurname}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                    <input
                                        name="adminPhoneNumber"
                                        className="form-control"
                                        placeholder="adminPhoneNumber"
                                        value={this.state.adminPhoneNumber}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                    <input
                                        name="adminEmail"
                                        className="form-control"
                                        placeholder="adminEmail"
                                        value={this.state.adminEmail}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                    <input
                                        name="genderId"
                                        className="form-control"
                                        placeholder="genderId"
                                        value={this.state.genderId}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                    <input
                                        name="adminNationalId"
                                        className="form-control"
                                        placeholder="adminNationalId"
                                        value={this.state.adminNationalId}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                    <input
                                        name="adminPassword"
                                        className="form-control"
                                        placeholder="adminPassword"
                                        value={this.state.adminPassword}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-success btn-block"
                                >
                                    Submit
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>

                <Table tableTitle='Registered System Admin'
                       tableHeaderObject={this.state.tableHeaders}
                       tableData={this.props.registeredSystemAdmin}/>
            </div>
        );
    }
}


SystemAdmin.propTypes = {
    registerSystemAdmin: PropTypes.func.isRequired,
    systemAdminSuccessFullyRegistered: PropTypes.bool.isRequired,
    fetchAllSystemAdmin: PropTypes.func.isRequired,
    registeredSystemAdmin: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
    systemAdminSuccessFullyRegistered: state.system_admin.systemAdminSuccessFullyRegistered,
    registeredSystemAdmin: state.system_admin.registeredSystemAdmin
});



const mapDispatchToProps = dispatch => ({
    registerSystemAdmin: payload => dispatch(registerSystemAdmin(payload)),
    fetchAllSystemAdmin: () => dispatch(fetchAllSystemAdmin())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SystemAdmin);