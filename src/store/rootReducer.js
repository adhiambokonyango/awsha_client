import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";

import { reducer as sign_up } from "./modules/admin_sign_up";
import { reducer as company } from "./modules/company";
import { reducer as gender_info } from "./modules/gender_info";
import { reducer as log_in } from "./modules/log_in";
import { reducer as teams } from "./modules/teams";
import { reducer as team_member_sign_up } from "./modules/team_member_sign_up";


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
    team_member_sign_up


  })
);

export default rootReducer;
