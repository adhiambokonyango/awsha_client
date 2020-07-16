import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";

 import { reducer as sign_up } from "./modules/sign_up";
import { reducer as company } from "./modules/company";
import { reducer as gender_info } from "./modules/gender_info";
import { reducer as log_in } from "./modules/log_in";
import { reducer as teams } from "./modules/teams";
import { reducer as projects } from "./modules/projects";
import { reducer as project_objectives } from "./modules/project_objectives";
import { reducer as objective_percentage } from "./modules/objective_percentage";
import { reducer as objectives } from "./modules/objectives";
import { reducer as company_user } from "./modules/company_users";
import { reducer as team_members } from "./modules/team_members";
import { reducer as confirmation_status } from "./modules/confirmation_status";
import { reducer as privileges } from "./modules/privileges";



// =============================================================
// The rootReducer object aggregates our earlier reducers into a
// single reducer that holds our entire immutable application
// (theme) state.
// =============================================================

const rootReducer = reduceReducers(
  combineReducers({


    sign_up,
      company,
      gender_info,
     log_in,
      teams,
      team_members,
      projects,
      project_objectives,
      objective_percentage,
      objectives,
    company_user,
    confirmation_status,
      privileges




  })
);

export default rootReducer;
