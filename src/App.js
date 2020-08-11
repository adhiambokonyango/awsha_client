import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bulma/css/bulma.css";


import Company from "./views/company/Company";

import Gender from "./views/gender_info/Gender";
import AdminPage from "./views/admin_page/AdminPage";
import Teams from "./views/teams/Teams";
import Projects from "./views/projects/Projects";
import ProjectObjectives from "./views/project_objectives/ProjectObjectives";
// import ProjectDetails from "./views/project_details/ProjectDetails";
// import Percentage from "./views/percentage/Percentage";
import Objectives from "./views/objectives/Objectives";
import CompanyUsers from "./views/company_users/CompanyUsers";
import RegisteredUser from "./views/user_sign_up/RegisteredUser";
import TeamMember from "./views/team_members/TeamMember";
import SignUp from "./views/user_sign_up/SignUp";
import FirstLevelAdmin from "./components/moh/FirstLevelAdmin";
 import UserManagement from "./views/admin_page/UserManagement";
import LogIn from "./views/user_log_in/LogIn";
import AdminSignUp from "./views/admin_sign_up/AdminSignUp";
import RegisteredAdmin from "./views/admin_sign_up/RegisteredAdmin";
import RegisteredAdministrator from "./views/administrator_sign_up/RegisteredAdministrator";
import AdministratorSignUp from "./views/administrator_sign_up/AdministratorSignUp";
import Privileges from "./views/privileges/Privileges";
import Demo1 from "./views/Demo1";
import AdminManagement from "./views/admin_page/AdminManagement";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
            <Route path="/" exact component={LogIn} />

            <Route path="/admin_page" exact component={AdminPage} />
          <Route path="/register_users" exact component={SignUp} />
          <Route path="/company_registration" exact component={Company} />
          <Route path="/gender" exact component={Gender} />

           <Route path="/teams" exact component={Teams} />
            <Route path="/registered_users" exact component={RegisteredUser} />

            <Route path="/register_projects" exact component={Projects} />

            <Route path="/register_project_objectives" exact component={ProjectObjectives} />
            <Route path="/objectives" exact component={Objectives} />
            <Route path="/company_user" exact component={CompanyUsers} />
            <Route path="/team_members" exact component={TeamMember} />

             <Route path="/first_level_admin" exact component={FirstLevelAdmin} />
          {/*  <Route path="/percentage" exact component={Percentage} />*/}
           <Route path="/user_management" exact component={UserManagement} />
            <Route path="/register_system_admin" exact component={AdminSignUp} />
            <Route path="/registered_admin" exact component={RegisteredAdmin} />
            <Route path="/registered_administrators" exact component={RegisteredAdministrator} />
            <Route path="/register_administrator" exact component={AdministratorSignUp} />
            <Route path="/privileges" exact component={Privileges} />
            <Route path="/demo" exact component={Demo1} />
            <Route path="/admin_management" exact component={AdminManagement} />
        </div>
      </Router>
    );
  }
}

export default App;
