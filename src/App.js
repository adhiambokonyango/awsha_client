import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bulma/css/bulma.css";
// import Login from "./views/authentication/Login.jsx";
// import AdminHome from "./views/admin_home/AdminHome";
// import StaffHome from "./views/staff_home/StaffHome";

import Company from "./views/company/Company";

import SignUpForm from "./views/sign_up/SignUp";
import Gender from "./views/gender_info/Gender";
import Login from "./views/log_in/LogIn";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
            <Route path="/" exact component={Login} />
            <Route path="/admin_sign_up" exact component={SignUpForm} />
          <Route path="/company" exact component={Company} />
          <Route path="/gender" exact component={Gender} />

        </div>
      </Router>
    );
  }
}

export default App;
