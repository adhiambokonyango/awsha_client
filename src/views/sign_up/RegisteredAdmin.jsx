import React, {Component} from 'react';
import NavigationBar from "../admin_page/nav_bar/NavigationBar";
import Table from "../../components/table/table_body/Table";
import PropTypes from "prop-types";
import {fetchAllAdmin, registerAdmin} from "../../store/modules/sign_up/actions";
import {fetchAllGender} from "../../store/modules/gender_info/actions";
import {connect} from "react-redux";

class RegisteredAdmin extends Component {
    state = {
        tableData: [],
        tableHeaders: {
            AdminId:'#',
            adminFirstName: 'AdminFirstName',
            adminMiddleName: 'AdminMiddleName',
            adminSurname: 'AdminSurname',
            adminPhoneNumber: 'AdminPhoneNumber',
            adminEmail: 'AdminEmail',
            adminNationalId: 'AdminNationalId',
            gender: 'Gender',
            encryptedPassword: 'EncryptedPassword'

        }
    };

    componentDidMount() {
        this.props.fetchAllAdmin();
    }



    render() {
        return (
            <div>
            <NavigationBar />
                <Table tableTitle='Registered Admin'
                       tableHeaderObject={this.state.tableHeaders}
                       tableData={this.props.registeredAdmin}/>
            </div>
        );
    }
}

RegisteredAdmin.propTypes = {
    fetchAllAdmin: PropTypes.func.isRequired,
    registeredAdmin: PropTypes.arrayOf(PropTypes.object).isRequired,

};

const mapStateToProps = state => ({
    registeredAdmin: state.sign_up.registeredAdmin,
});

const mapDispatchToProps = dispatch => ({
    fetchAllAdmin: () => dispatch(fetchAllAdmin()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisteredAdmin);