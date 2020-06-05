import React, {Component} from 'react';
import NavigationBar from "./nav_bar/NavigationBar";
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Form,
    Container, Row, Col

} from 'react-bootstrap';
import {FaCogs, FaList, FaPlusCircle} from "react-icons/fa";
import { Link } from 'react-router-dom'
import AdminSideBar from "../../components/sidebar/AdminSideBar";


class AdminPage extends Component {
    render() {
        return (
            <div className="container">
              <NavigationBar />
              <AdminSideBar />


            </div>
        );
    }
}

export default AdminPage;