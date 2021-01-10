import React, { Component } from "react";
import Pagination from "react-js-pagination";
import {fetchAllUser} from "../../store/user_management/user_sign_up/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";



class Demo2 extends Component {
    state = {
        user: null
    }

    componentDidMount() {
         // this.props.fetchAllUser();
        // const { page, limit } = this.props.match.params;
        let handle_1 = 1;
        let handle_2 = 1;

        fetch(`http://127.0.0.1:5000/get_all_users/${handle_1}/${handle_2}`)
            .then((user) => {
                this.setState(() => ({ user }))
            })

    }

    componentDidUpdate(prevProps) {
        if(this.props.registeredUser !== prevProps.registeredUser) {
            if(this.props.registeredUser.length > 0) {
               let users = this.props.registeredUser;
                this.setState({
                    posts: users,
                });
            }
        }
    }

    render() {

        return (
            <div>

            </div>
        );
    }
}

Demo2.propTypes = {

    fetchAllUser: PropTypes.func.isRequired,
    registeredUser: PropTypes.arrayOf(PropTypes.object).isRequired,

};


const mapStateToProps = state => ({
    registeredUser: state.user_sign_up.registeredUser,
});



const mapDispatchToProps = dispatch => ({
    fetchAllUser: () => dispatch(fetchAllUser()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Demo2);
