import React, {Component} from 'react';
import NavigationBar from "../../src/views/admin_page/nav_bar/NavigationBar";
import Table from "../../src/components/table/table_body/Table";
import PropTypes from "prop-types";
import {fetchAllTeamMember} from "../team_member_signup/actions";
import {fetchAllGender} from "../../src/store/modules/gender_info/actions";
import {connect} from "react-redux";
import AdminSideBar from "../../src/components/sidebar/AdminSideBar";

class RegisteredTeamMemebers extends Component {
    state = {
        tableData: [],
        tableHeaders: {
            Number:'#',
            TeamMemberName: 'TeamMemberName',
            TeamMemberEmail: 'TeamMemberEmail',
            TeamName: 'TeamId',
            CompanyName: 'CompanyName',
            Gender: 'Gender',
            TeamMemberNationalId: 'TeamMemberNationalId'

        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.registeredTeamMember !== prevProps.registeredTeamMember) {
            if(this.props.registeredTeamMember && this.props.registeredTeamMember.length > 0) {

                let teamMembers = this.props.registeredTeamMember.map(
                    (item, index) => {
                        return {
                            id: index + 1,
                            TeamMemberName: item.TeamMemberName,
                            TeamMemberEmail: item.TeamMemberEmail,
                            TeamName: item.TeamName,
                            CompanyName: item.CompanyName,
                            Gender: item.GenderTitle,
                            TeamMemberNationalId: item.TeamMemberNationalId
                        };
                    }
                );

                this.setState({tableData: teamMembers});

            }
        }
    }

    componentDidMount() {
        this.props.fetchAllTeamMember();
    }



    render() {
        return (
            <div>
                <NavigationBar />



                    <Table tableTitle='Registered Officers'
                           tableHeaderObject={this.state.tableHeaders}
                           tableData={this.state.tableData}/>
               

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