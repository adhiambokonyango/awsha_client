import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";

 import { reducer as user_sign_up } from "./user_management/user_sign_up";
import { reducer as gender_info } from "./modules/gender_info";
import { reducer as user_log_in } from "./user_management/user_log_in";
import { reducer as teams } from "./modules/teams";
import { reducer as projects } from "./modules/projects";
import { reducer as objectives } from "./modules/objectives";
import { reducer as team_members } from "./modules/team_members";
import {reducer as admin_sign_up} from "./user_management/admin_sign_up";
import {reducer as administrator_sign_up} from "./user_management/administrator_sign_up";
import {reducer as privileges} from "./modules/privileges";
import {reducer as confirmation_status} from "./modules/confirmation_status";
import {reducer as admin_privileges} from "./modules/admin_privileges";
import {reducer as administrator_privileges} from "./modules/administrator_privileges";
import {reducer as session_log} from "./activity_log/user_session_log";
import {reducer as branches} from "./modules/branch_project";
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
      gender_info,
     user_log_in,
      teams,
      team_members,
      projects,
      objectives,
      privileges,
      confirmation_status,
      admin_privileges,
      administrator_privileges,
      session_log,
      branches
  })
);

export default rootReducer;
