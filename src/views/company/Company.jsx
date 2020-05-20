import React, {Component} from 'react';

import { connect } from "react-redux";
import Modal from "react-awesome-modal";
import PropTypes from "prop-types";
import {registerCompany, fetchAllCompany} from "../../store/modules/company/actions";
import Table from "../../components/table/table_body/Table";
import TopBar from "../../components/topbar/TopBar";

class Company extends Component {

    state = {
        companyName:'',
        companyEmail:'',
        companyPostalAdress:'',
        companyLocation:'',
        companyTelephone:'',

        tableData: [],
        tableHeaders: {
            CompanyId:'#',
            CompanyName:'CompanyName',
            CompanyEmail:'CompanyEmail',
            CompanyPostalAdress:'CompanyPostalAdress',
            CompanyLocation:'CompanyLocation',
            CompanyTelephone:'CompanyTelephone'
            
        }
    };


    componentDidMount() {
        this.props.fetchAllCompany();
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
            CompanyName:this.state.companyName,
            CompanyEmail:this.state.companyEmail,
            CompanyPostalAdress:this.state.companyPostalAdress,
            CompanyLocation:this.state.companyLocation,
            CompanyTelephone:this.state.companyTelephone,
        };

        this.props.registerCompany(payload);
        this.setState({
            companyName:'',
            companyEmail:'',
            companyPostalAdress:'',
            companyLocation:'',
            companyTelephone:'',});
    };

    render() {
        return (
            <div>
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Register Company</h3>
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
                                        name="companyName"
                                        className="form-control"
                                        placeholder="companyName"
                                        value={this.state.companyName}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                    <input
                                        name="companyEmail"
                                        className="form-control"
                                        placeholder="companyEmail"
                                        value={this.state.companyEmail}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                    <input
                                        name="companyPostalAdress"
                                        className="form-control"
                                        placeholder="companyPostalAdress"
                                        value={this.state.companyPostalAdress}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                    <input
                                        name="companyLocation"
                                        className="form-control"
                                        placeholder="companyLocation"
                                        value={this.state.companyLocation}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />

                                    <input
                                        name="companyTelephone"
                                        className="form-control"
                                        placeholder="companyTelephone"
                                        value={this.state.companyTelephone}
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

                <Table tableTitle='Registered Companies'
                       tableHeaderObject={this.state.tableHeaders}
                       tableData={this.props.registeredCompany}/>
            </div>
        );
    }
}


Company.propTypes = {
    registerCompany: PropTypes.func.isRequired,
    companySuccessFullyRegistered: PropTypes.bool.isRequired,
    fetchAllCompany: PropTypes.func.isRequired,
    registeredCompany: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
    companySuccessFullyRegistered: state.company.companySuccessFullyRegistered,
    registeredCompany: state.company.registeredCompany
});



const mapDispatchToProps = dispatch => ({
    registerCompany: payload => dispatch(registerCompany(payload)),
    fetchAllCompany: () => dispatch(fetchAllCompany())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Company);