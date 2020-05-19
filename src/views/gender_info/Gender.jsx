import React, {Component} from 'react';

import { connect } from "react-redux";
import Modal from "react-awesome-modal";
import PropTypes from "prop-types";
import {fetchAllGender, registerGender} from "../../store/modules/gender_info/actions";
import Table from "../../components/table/table_body/Table";
import TopBar from "../../components/topbar/TopBar";

class Gender extends Component {

    state = {
        genderTitle:'',

        tableData: [],
        tableHeaders: {
            GenderId:'#',
            GenderTitle:'GenderTitle'

        }
    };


    componentDidMount() {
        this.props.fetchAllGender();
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
            GenderTitle:this.state.genderTitle
        };

        this.props.registerGender(payload);
        this.setState({genderTitle:''});
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Register Gender</h3>
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
                                        name="genderTitle"
                                        className="form-control"
                                        placeholder="Gender"
                                        value={this.state.genderTitle}
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

                <Table tableTitle='Registered Gender'
                       tableHeaderObject={this.state.tableHeaders}
                       tableData={this.props.registeredGender}/>
            </div>
        );
    }
}


Gender.propTypes = {
    registerGender: PropTypes.func.isRequired,
    genderSuccessFullyRegistered: PropTypes.bool.isRequired,
    fetchAllGender: PropTypes.func.isRequired,
    registeredGender: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
    genderSuccessFullyRegistered: state.gender_info.genderSuccessFullyRegistered,
    registeredGender: state.gender_info.registeredGender
});



const mapDispatchToProps = dispatch => ({
    registerGender: payload => dispatch(registerGender(payload)),
    fetchAllGender: () => dispatch(fetchAllGender())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Gender);