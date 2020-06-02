import React, {Component} from 'react';
import NavigationBar from "../admin_page/nav_bar/NavigationBar";
import Table from "../../components/table/table_body/Table";
import PropTypes from "prop-types";
import {fetchAllTeamMember} from "../../store/modules/team_member_sign_up/actions";
import {fetchAllGender} from "../../store/modules/gender_info/actions";
import {connect} from "react-redux";

class RegisteredTeamMemebers extends Component {
    state = {
        tableData: [],
        tableHeaders: {
            TeamMemberId:'#',
            TeamMemberName: 'TeamMemberName',
            TeamMemberEmail: 'TeamMemberEmail',
            TeamName: 'TeamId',
            CompanyName: 'CompanyName',
            Gender: 'Gender',
            TeamMemberNationalId: 'TeamMemberNationalId',
            EncryptedPassword: 'EncryptedPassword',

        }
    };

    componentDidMount() {
        this.props.fetchAllTeamMember();
    }



    render() {
        return (
            <div>
                <NavigationBar />
                <Table tableTitle='Registered Officers'
                       tableHeaderObject={this.state.tableHeaders}
                       tableData={this.props.registeredTeamMember}/>
            </div>
        );
    }
}

RegisteredTeamMemebers.propTypes = {
    fetchAllTeamMember: PropTypes.func.isRequired,
    registeredTeamMember: PropTypes.arrayOf(PropTypes.object).isRequired,

};

const mapStateToProps = state => ({
    registeredTeamMember: state.team_member_sign_up.registeredTeamMember,
});

const mapDispatchToProps = dispatch => ({
    fetchAllTeamMember: () => dispatch(fetchAllTeamMember()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisteredTeamMemebers);