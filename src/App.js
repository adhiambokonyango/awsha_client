import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bulma/css/bulma.css";
// import Login from "./views/authentication/Login.jsx";
// import AdminHome from "./views/admin_home/AdminHome";
// import StaffHome from "./views/staff_home/StaffHome";

import Company from "./views/company/Company";

import Gender from "./views/gender_info/Gender";
import AdminPage from "./views/admin_page/AdminPage";
import Teams from "./views/teams/Teams";
import Projects from "./views/projects/Projects";
import ProjectObjectives from "./views/project_objectives/ProjectObjectives";
import ProjectDetails from "./views/project_details/ProjectDetails";
import Demo1 from "./views/Demo1";
import Percentage from "./views/percentage/Percentage";
import Objectives from "./views/objectives/Objectives";
import CompanyUsers from "./views/company_users/CompanyUsers";
import RegisteredUser from "./views/sign_up/RegisteredUser";
import TeamMember from "./views/team_members/TeamMember";
import SignUp from "./views/sign_up/SignUp";
import FirstLevelAdmin from "./components/moh/FirstLevelAdmin";
 import UserManagement from "./views/admin_page/UserManagement";
import Privileges from "./views/privileges/Privileges";
import LogIn from "./views/log_in/LogIn";


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
            <Route path="/privileges" exact component={Privileges} />




        </div>
      </Router>
    );
  }
}

export default App;
