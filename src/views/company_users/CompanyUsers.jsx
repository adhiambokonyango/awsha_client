import React, {Component} from 'react';
import {fetchAllCompany} from "../../store/modules/company/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import {Link} from "react-router-dom";
import {fetchAllUser, registerUser} from "../../store/user_management/user_sign_up/actions";

import {registerCompanyUser, fetchAllCompanyUser} from "../../store/modules/company_users/actions";

class CompanyUsers extends Component {

    state = {




        selectedOptionOne: '',
        selectOptionsOne: [],

        selectedOptionTwo: '',
        selectOptionsTwo: [],


    };


    componentDidMount() {
        this.props.fetchAllCompany();
        this.props.fetchAllUser();
        this.props.fetchAllCompanyUser();
    }

    componentDidUpdate(prevProps) {
        if(this.props.registeredCompany !== prevProps.registeredCompany) {
            if(this.props.registeredCompany.length > 0) {
                let allregisteredCompany = this.props.registeredCompany;

                allregisteredCompany = allregisteredCompany.map(item => {
                    return {
                        label: item.CompanyName,
                        value: item.CompanyId
                    };
                });
                this.setState({ selectOptionsTwo: allregisteredCompany });
            }
        }

        if(this.props.registeredUser !== prevProps.registeredUser) {
            if(this.props.registeredUser.length > 0) {
                let allregisteredUser = this.props.registeredUser;

                allregisteredUser = allregisteredUser.map(item => {
                    return {
                        label: item.FirstName,
                        value: item.UserId
                    };
                });
                this.setState({ selectOptionsOne: allregisteredUser });
            }
        }

    };



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
            UserId:this.state.selectedOptionOne.value,
            CompanyId:this.state.selectedOptionTwo.value,

        };


        this.props.registerCompanyUser(payload);
        this.setState({
            });

    };

    render() {
        return (
            <>

                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">select employees for each agencies</h3>
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
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            placeholder="Select Company"
                                            name="selectedOptionThree"
                                            closeMenuOnSelect={true}
                                            value={this.state.selectedOptionTwo}
                                            onChange={value =>
                                                this.setState({
                                                    ...this.state,
                                                    selectedOptionTwo: value
                                                })
                                            }
                                            options={this.state.selectOptionsTwo}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            placeholder="Select Officer"
                                            name="selectedOptionOne"
                                            closeMenuOnSelect={true}
                                            value={this.state.selectedOptionOne}
                                            onChange={value =>
                                                this.setState({
                                                    ...this.state,
                                                    selectedOptionOne: value
                                                })
                                            }
                                            options={this.state.selectOptionsOne}
                                        />
                                    </div>






                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-success btn-block"
                                    >
                                        Submit
                                    </button>

                                    {/*<button*/}
                                    {/*    type="btn-link"*/}
                                    {/*    className="btn btn-lg btn-success btn-block"*/}
                                    {/*>*/}
                                    {/*    <Link to="/registered_team_members">View Registered Employess</Link>*/}
                                    {/*</button>*/}
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}


CompanyUsers.propTypes = {
    fetchAllCompany: PropTypes.func.isRequired,
    registeredCompany: PropTypes.arrayOf(PropTypes.object).isRequired,
    registeredUser: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllUser: PropTypes.func.isRequired,
    registerCompanyUser: PropTypes.func.isRequired,
    fetchAllCompanyUser:PropTypes.func.isRequired,
    registeredCompanyUser: PropTypes.arrayOf(PropTypes.object).isRequired
};


const mapStateToProps = state => ({
    registeredCompany: state.company.registeredCompany,
    registeredUser: state.sign_up.registeredUser,
    registeredCompanyUser: state.company_user.registeredCompanyUser
});



const mapDispatchToProps = dispatch => ({
    registerCompanyUser: payload => dispatch(registerCompanyUser(payload)),
    fetchAllCompany: () => dispatch(fetchAllCompany()),
    fetchAllUser: () => dispatch(fetchAllUser()),
    fetchAllCompanyUser: () => dispatch(fetchAllCompanyUser()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyUsers);