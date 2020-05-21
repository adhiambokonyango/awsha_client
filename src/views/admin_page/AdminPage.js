import React, {Component} from 'react';
import NavigationBar from "./nav_bar/NavigationBar";

class AdminPage extends Component {
    render() {
        return (
            <div className="container">
              <NavigationBar />
            </div>
        );
    }
}

export default AdminPage;