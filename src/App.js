import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bulma/css/bulma.css";
import Gender from "./views/gender_info/Gender";
import AdminPage from "./views/admin_page/AdminPage";
import Teams from "./views/teams/Teams";
import Projects from "./views/projects/Projects";
import Objectives from "./views/objectives/Objectives";
import RegisteredUser from "./views/user_sign_up/RegisteredUser";
import SignUp from "./views/user_sign_up/SignUp";
import FirstLevelAdmin from "./components/moh/FirstLevelAdmin";
 import UserManagement from "./views/admin_page/UserManagement";
import LogIn from "./views/user_log_in/LogIn";
import AdminSignUp from "./views/admin_sign_up/AdminSignUp";
import RegisteredAdmin from "./views/admin_sign_up/RegisteredAdmin";
import RegisteredAdministrator from "./views/administrator_sign_up/RegisteredAdministrator";
import AdministratorSignUp from "./views/administrator_sign_up/AdministratorSignUp";
import Privileges from "./views/privileges/Privileges";
import AdminManagement from "./views/admin_page/AdminManagement";
import AdminPrivileges from "./views/admin_privileges/AdminPrivileges";
import AdministratorPrivileges from "./views/administrator_privileges/AdministratorPrivileges";
import AdministratorManagement from "./views/admin_page/AdministratorManagement";
import AdministratorLevel from "./components/moh/AdministratorLevel";
import UserLevel from "./components/moh/UserLevel";
import NavigationBar from "./views/admin_page/nav_bar/NavigationBar";
import HomePage from "./components/home_page/HomePage";
import ProjectDetail from "./views/projects/ProjectDetail";
import CheckBoxGroup from "./components/check_box_group/CheckBoxGroup";
import BranchProject from "./views/BranchProjects/BranchProject";
import ProjectStatus from "./views/BranchProjects/ProjectStatus";
import Report from "./views/report_system/Report";
import Paginate from "./views/user_sign_up/Paginate";


class App extends Component {

  render() {
    return (
      <Router>

            <div>
                <Route path="/log in" exact component={LogIn} />
                <Route path="/admin_page" exact component={AdminPage} />
                <Route path="/register_users/:page/:limit" exact component={SignUp} />
                <Route path="/gender" exact component={Gender} />
                <Route path="/teams" exact component={Teams} />
                <Route path="/registered_users" exact component={RegisteredUser} />
                <Route path="/register_projects" exact component={Projects} />
                <Route path="/objectives" exact component={Objectives} />
                <Route path="/first_level_admin" exact component={FirstLevelAdmin} />
                <Route path="/administrator_level" exact component={AdministratorLevel} />
                <Route path="/user_management" exact component={UserManagement} />
                <Route path="/register_system_admin" exact component={AdminSignUp} />
                <Route path="/registered_admin" exact component={RegisteredAdmin} />
                <Route path="/registered_administrators" exact component={RegisteredAdministrator} />
                <Route path="/register_administrator" exact component={AdministratorSignUp} />
                <Route path="/privileges" exact component={Privileges} />
                <Route path="/admin_management" exact component={AdminManagement} />
                <Route path="/admin_privileges" exact component={AdminPrivileges} />
                <Route path="/administrator_privileges" exact component={AdministratorPrivileges} />
                <Route path="/administrator_management" exact component={AdministratorManagement} />
                <Route path="/user_level" exact component={UserLevel} />
                <Route path="/logout" exact component={NavigationBar} />
                <Route path="/" exact component={HomePage} />
                <Route path="/project_detail" exact component={ProjectDetail} />
                <Route path="/check" exact component={CheckBoxGroup} />
                <Route path="/branch_project" exact component={BranchProject} />
                <Route path="/project_status" exact component={ProjectStatus} />
                <Route path="/nav_bar" exact component={NavigationBar} />
                <Route path="/report" exact component={Report} />

                <Route path="/paginate" exact component={Paginate} />
                <Route path="/users" exact component={RegisteredUser} />
            </div>


      </Router>
    );
  }
}

export default App;
