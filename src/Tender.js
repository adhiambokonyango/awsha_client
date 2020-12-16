import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Demo2 from "./views/demo/Demo2";
import LogIn from "./views/user_log_in/LogIn";
import FirstLevelAdmin from "./components/moh/FirstLevelAdmin";
class Tender extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route path="/demos" exact component={Demo2} />
                        <Route path="/logins" exact component={LogIn} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default Tender;
