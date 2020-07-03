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
import AdminPage from "./views/admin_page/AdminPage";
import Teams from "./views/teams/Teams";
import RegisteredAdmin from "./views/sign_up/RegisteredUser";
import TeamMemberSignUp from "./views/team_member_sign_up/TeamMemberSignUp";
import RegisteredTeamMemebers from "./views/team_member_sign_up/RegisteredTeamMemebers";
import Projects from "./views/projects/Projects";
import ProjectObjectives from "./views/project_objectives/ProjectObjectives";
import ProjectDetails from "./views/project_details/ProjectDetails";
import Demo1 from "./views/Demo1";
import Percentage from "./views/percentage/Percentage";
import Objectives from "./views/objectives/Objectives";
import CompanyUsers from "./views/company_users/CompanyUsers";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
            {/*<Route path="/" exact component={Login} />*/}
            <Route path="/admin_page" exact component={AdminPage} />
          {/*  <Route path="/sign_up" exact component={SignUpForm} />*/}
          {/*<Route path="/company" exact component={Company} />*/}
          {/*<Route path="/gender" exact component={Gender} />*/}
          {/*  <Route path="/teams" exact component={Teams} />*/}
          {/*  <Route path="/registered_users" exact component={RegisteredAdmin} />*/}
          {/*  <Route path="/team_members" exact component={TeamMemberSignUp} />*/}
          {/*  <Route path="/registered_team_members" exact component={RegisteredTeamMemebers} />*/}
            <Route path="/register_projects" exact component={Projects} />
            <Route path="/register_project_objectives" exact component={ProjectObjectives} />
            <Route path="/objectives" exact component={Objectives} />
            <Route path="/company_user" exact component={CompanyUsers} />

            {/*  <Route path="/demo" exact component={Demo1} />*/}
          {/*  <Route path="/percentage" exact component={Percentage} />*/}

        </div>
      </Router>
    );
  }
}

export default App;
