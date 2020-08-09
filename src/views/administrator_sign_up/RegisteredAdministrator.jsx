import React, {Component} from 'react';
import NavigationBar from "../admin_page/nav_bar/NavigationBar";
import Table from "../../components/table/table_body/Table";
import PropTypes from "prop-types";
import {fetchAllAdministrator} from "../../store/user_management/administrator_sign_up/actions";
import {fetchAllGender} from "../../store/modules/gender_info/actions";
import {connect} from "react-redux";

class RegisteredAdministrator extends Component {
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
        this.props.fetchAllAdministrator();
    }



    render() {
        return (
            <div>
            <NavigationBar />
                <Table tableTitle='Registered Users'
                       tableHeaderObject={this.state.tableHeaders}
                       tableData={this.props.registeredAdministrator}/>
            </div>
        );
    }
}

RegisteredAdministrator.propTypes = {
    fetchAllAdministrator: PropTypes.func.isRequired,
    registeredAdministrator: PropTypes.arrayOf(PropTypes.object).isRequired,

};

const mapStateToProps = state => ({
    registeredAdministrator: state.administrator_sign_up.registeredAdministrator,
});

const mapDispatchToProps = dispatch => ({
    fetchAllAdministrator: () => dispatch(fetchAllAdministrator()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisteredAdministrator);