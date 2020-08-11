import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";

 import { reducer as user_sign_up } from "./user_management/user_sign_up";
import { reducer as company } from "./modules/company";
import { reducer as gender_info } from "./modules/gender_info";
import { reducer as user_log_in } from "./user_management/user_log_in";
import { reducer as teams } from "./modules/teams";
import { reducer as projects } from "./modules/projects";
import { reducer as project_objectives } from "./modules/project_objectives";
import { reducer as objective_percentage } from "./modules/objective_percentage";
import { reducer as objectives } from "./modules/objectives";
import { reducer as company_user } from "./modules/company_users";
import { reducer as team_members } from "./modules/team_members";
import {reducer as admin_sign_up} from "./user_management/admin_sign_up";
import {reducer as administrator_sign_up} from "./user_management/administrator_sign_up";
import {reducer as privileges} from "./modules/privileges";
import {reducer as confirmation_status} from "./modules/confirmation_status";
// =============================================================
// The rootReducer object aggregates our earlier reducers into a
// single reducer that holds our entire immutable application
// (theme) state.
// =============================================================

const rootReducer = reduceReducers(
  combineReducers({
      administrator_sign_up,
      admin_sign_up,
    user_sign_up,
      company,
      gender_info,
     user_log_in,
      teams,
      team_members,
      projects,
      project_objectives,
      objective_percentage,
      objectives,
    company_user,
      privileges,
      confirmation_status






  })
);

export default rootReducer;
