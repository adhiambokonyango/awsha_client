import React, {Component} from 'react';
import NavigationBar from "../admin_page/nav_bar/NavigationBar";
import Table from "../../components/table/table_body/Table";
import PropTypes from "prop-types";
import {fetchAllAdmin, registerAdmin} from "../../store/user_management/admin_sign_up/actions";
import {fetchAllGender} from "../../store/modules/gender_info/actions";
import {connect} from "react-redux";

class RegisteredAdmin extends Component {
    state = {
        tableData: [],
        tableHeaders: {
            Id:'#',
            FirstName: 'FirstName',
            MiddleName: 'MiddleName',
            Surname: 'Surname',
            PhoneNumber: 'PhoneNumber',
            Email: 'Email',
            NationalId: 'NationalId',
            GenderId: 'Gender',
            EncryptedPassword: 'EncryptedPassword'
        }
    };

    componentDidMount() {
        this.props.fetchAllAdmin();
    }



    render() {
        return (
            <div>
            <NavigationBar />
                <Table tableTitle='Registered Users'
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
    registeredAdmin: state.admin_sign_up.registeredAdmin,
});

const mapDispatchToProps = dispatch => ({
    fetchAllAdmin: () => dispatch(fetchAllAdmin()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisteredAdmin);