import React, {Component} from 'react';
import SignUpForm from "./SignUpForm";

class SignUp extends Component {
    render() {
        return (
            <div className="jumbotron">
              <SignUpForm />
            </div>
        );
    }
}

export default SignUp;