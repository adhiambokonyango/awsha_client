import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";
import { reducer as current_session } from "./modules/current_session";
import { reducer as admin_home } from "./modules/admin_home";
import { reducer as staff_home } from "./modules/staff_home";
import { reducer as system_admin } from "./modules/system_admin";
import { reducer as company } from "./modules/company";

// =============================================================
// The rootReducer object aggregates our earlier reducers into a
// single reducer that holds our entire immutable application
// (theme) state.
// =============================================================

const rootReducer = reduceReducers(
  combineReducers({
    current_session,
      admin_home,
      staff_home,
      system_admin,
      company
  })
);

export default rootReducer;
