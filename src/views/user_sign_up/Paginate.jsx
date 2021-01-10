import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import {page, limit} from "../../config/constants/Constants";
import { fetchAllUserRecords} from "../../store/user_management/user_sign_up/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";


class Paginate extends Component {

    state = {
        activePage: 1,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        pageRangeDisplayed: 5
    };

    componentDidMount() {
        this.props.fetchAllUserRecords();
    }

    render() {
        const {userRecords} = this.props;
        for (let i=0; i<userRecords.length;i++){
           this.state.totalItemsCount = userRecords[i].NumberOfRecords;
           console.log(this.state.totalItemsCount);
        }
        return (
            <div className="col-md-4 col-md-offset-4">
                <nav className="pagination">
                    <a href="#">&laquo;</a>

                    <a href="#">&raquo;</a>
                </nav>
                <h1>
                   hello: {this.state.totalItemsCount}
                </h1>

            </div>
        );
    }
}

Paginate.propTypes = {
    fetchAllUserRecords: PropTypes.func.isRequired,
    userRecords: PropTypes.arrayOf(PropTypes.object).isRequired,


};

const mapStateToProps = state => ({
    userRecords: state.user_sign_up.userRecords,

});

const mapDispatchToProps = dispatch => ({
    fetchAllUserRecords: () => dispatch(fetchAllUserRecords()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Paginate);
