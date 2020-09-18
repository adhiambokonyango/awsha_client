import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../../components/table/table_body/Table";
import {updateBranchProjectStatus, fetchAllBranchProjects} from '../../store/modules/branch_project/actions'
class ProjectStatus extends Component {
    state = {
        tableData: [],
        tableHeaders: {
            BranchProjectId:'#',
            ProjectId:'ProjectId',
            BranchName:'BranchName',
            BranchProjectStatus:'BranchProjectStatus',
        }
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.branch !== prevProps.branch) {
            if(this.props.branch && this.props.branch.length > 0) {
                let teamMembers = this.props.branch.map(
                    (item, index) => {
                        return {
                            id: index + 1,
                            ProjectId: item.ProjectId,
                            BranchName: item.BranchName,
                            BranchProjectStatus: item.BranchProjectStatus,
                        };
                    }
                );
                this.setState({tableData: teamMembers});
            }
        }
    }
    async componentDidMount() {
        this.props.fetchAllBranchProjects();
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
    render() {
        return (
            <div>
                <Table tableTitle='Registered Privileges'
                       tableHeaderObject={this.state.tableHeaders}
                       tableData={this.props.branch}/>
            </div>
        );
    }
}
ProjectStatus.propTypes = {
    fetchAllBranchProjects: PropTypes.func.isRequired,
    branch: PropTypes.arrayOf(PropTypes.object).isRequired,
};
const mapStateToProps = state => ({
    branch: state.privileges.branch
});
const mapDispatchToProps = dispatch => ({
    fetchAllBranchProjects: () => dispatch(fetchAllBranchProjects())
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectStatus);