import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";

import { reducer as sign_up } from "./modules/sign_up";
import { reducer as company } from "./modules/company";
import { reducer as gender_info } from "./modules/gender_info";
import { reducer as log_in } from "./modules/log_in";


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
      log_in


  })
);

export default rootReducer;
