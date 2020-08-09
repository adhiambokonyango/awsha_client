import React, {Component} from 'react';
import NavigationBar from "../admin_page/nav_bar/NavigationBar";
import Table from "../../components/table/table_body/Table";
import PropTypes from "prop-types";
import {fetchAllUser, registerUser} from "../../store/user_management/user_sign_up/actions";
import {fetchAllGender} from "../../store/modules/gender_info/actions";
import {connect} from "react-redux";

class RegisteredUser extends Component {
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
        this.props.fetchAllUser();
    }



    render() {
        return (
            <div>
            <NavigationBar />
                <Table tableTitle='Registered Users'
                       tableHeaderObject={this.state.tableHeaders}
                       tableData={this.props.registeredUser}/>
            </div>
        );
    }
}

RegisteredUser.propTypes = {
    fetchAllUser: PropTypes.func.isRequired,
    registeredUser: PropTypes.arrayOf(PropTypes.object).isRequired,

};

const mapStateToProps = state => ({
    registeredUser: state.user_sign_up.registeredUser,
});

const mapDispatchToProps = dispatch => ({
    fetchAllUser: () => dispatch(fetchAllUser()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisteredUser);