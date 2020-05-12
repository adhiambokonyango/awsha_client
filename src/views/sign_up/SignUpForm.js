import React, {Component} from 'react';
import PropTypes from 'prop-types';
import gender from "./data/gender";
import Select from "react-select";
import map from 'lodash/map';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminFirstName: '',
            adminMiddleName: '',
            adminSurname: '',
            adminPhoneNumber: '',
            adminEmail: '',
            genderId: '',
            adminNationalId: '',
            encryptedPassword: ''

        };

    }


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
            AdminFirstName:this.state.adminFirstName,
            AdminMiddleName:this.state.adminMiddleName,
            AdminSurname:this.state.adminSurname,
            AdminPhoneNumber:this.state.adminPhoneNumber,
            AdminEmail:this.state.adminEmail,
            GenderId:this.state.genderId,
            AdminNationalId:this.state.adminNationalId,
            EncryptedPassword:this.state.encryptedPassword,
        };

        // this.props.registerCompany(payload);
        this.setState({
            adminFirstName: '',
            adminMiddleName: '',
            adminSurname: '',
            adminPhoneNumber: '',
            adminEmail: '',
            genderId: '',
            adminNationalId: '',
            encryptedPassword: ''});
    };


    render() {
        const options = map(gender, (val, key) =>
            <option key={val} value={val}>{key}</option>
        );
        return (
            <div>
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">welcome to system admin registration...</h3>
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
                                        name="adminFirstName"
                                        className="form-control"
                                        placeholder="adminFirstName"
                                        value={this.state.adminFirstName}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />
                                </div>
                                <div className="form-group">

                                    <input
                                        name="adminMiddleName"
                                        className="form-control"
                                        placeholder="adminMiddleName"
                                        value={this.state.adminMiddleName}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />
                                </div>
                                <div className="form-group">

                                    <input
                                        name="adminSurname"
                                        className="form-control"
                                        placeholder="adminSurname"
                                        value={this.state.adminSurname}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />
                                </div>
                                <div className="form-group">

                                    <input
                                        name="adminPhoneNumber"
                                        className="form-control"
                                        placeholder="adminPhoneNumber"
                                        value={this.state.adminPhoneNumber}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />
                                </div>
                                <div className="form-group">

                                    <input
                                        name="adminEmail"
                                        className="form-control"
                                        placeholder="adminEmail"
                                        value={this.state.adminEmail}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />
                                </div>
                                <div className="form-group">

                                    <select
                                        className="react-select"
                                        name="genderId"
                                        value={this.state.genderId}
                                        onChange={value =>
                                            this.setState({
                                                ...this.state,
                                                genderId: value
                                            })
                                        }
                                    >
                                        <option value="" disabled>select gender</option>
                                        {options}
                                    </select>
                                </div>



                                <div className="form-group">
                                <input
                                        name="adminNationalId"
                                        className="form-control"
                                        placeholder="adminNationalId"
                                        value={this.state.adminNationalId}
                                        type="text"
                                        onChange={this.handleChange}
                                        autoFocus
                                        required={true}
                                    />
                                </div>
                                <div className="form-group">

                                    <input
                                        name="encryptedPassword"
                                        className="form-control"
                                        placeholder="encryptedPassword"
                                        value={this.state.encryptedPassword}
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
            </div>
        );
    }
}

SignUpForm.propTypes = {};

export default SignUpForm;