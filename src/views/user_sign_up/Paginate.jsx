import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import { fetchAllUserRecords, fetchAllUser} from "../../store/user_management/user_sign_up/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FaCogs, FaList} from "react-icons/fa";



class Paginate extends Component {

    state = {
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 0,
        pageRangeDisplayed: 5,

        tableData: []
    };

    componentDidMount() {
        this.props.fetchAllUserRecords();
        this.props.fetchAllUser(page, limit);
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.registeredUser !== prevProps.registeredUser) {
    //         if (this.props.registeredUser && this.props.registeredUser.length > 0) {
    //             let list = [];
    //             for (let i = 0; i < this.props.registeredUser.length; i++) {
    //                 list.push(<p>
    //                                 <h3>
    //                                     {" " + this.props.registeredUser[i].FirstName}
    //                                 </h3>
    //                     </p>
    //                 );
    //             }
    //             this.setState({tableData: list});
    //         }
    //     }
    // }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
        this.props.fetchAllUser(page, limit);
    }

    handlePageNumbers(){
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.totalItemsCount / this.state.itemsCountPerPage); i++) {
            pageNumbers.push(i);
        }
    }

    blog = () => {
        const user = (
            <ul>
                {this.props.registeredUser.map((post) =>
                        <h1>
                            <ul key={post.id} >
                                {post.FirstName+" " + post.Surname}
                            </ul></h1>
                )}
            </ul>
        );
        return (<div>{user}</div>);
    }


    render() {
        // total records
        const {userRecords} = this.props;
        for (let i=0; i<userRecords.length;i++){
           this.state.totalItemsCount = userRecords[i].NumberOfRecords;
        }
        // end total records

        // url params
        limit = this.state.itemsCountPerPage;
        page =this.state.activePage;
        // end url params


        return (
            <div className="col-md-4 col-md-offset-4">
                {this.blog()}
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.state.totalItemsCount}
                    pageRangeDisplayed={this.handlePageNumbers()}
                    onChange={this.handlePageChange.bind(this)}
                />
            </div>
        );
    }
}

export var page = "page";
export var limit = "limit";

Paginate.propTypes = {
    fetchAllUserRecords: PropTypes.func.isRequired,
    userRecords: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAllUser: PropTypes.func.isRequired,
    registeredUser: PropTypes.arrayOf(PropTypes.object).isRequired,


};

const mapStateToProps = state => ({
    userRecords: state.user_sign_up.userRecords,
    registeredUser: state.user_sign_up.registeredUser,
});

const mapDispatchToProps = dispatch => ({
    fetchAllUserRecords: () => dispatch(fetchAllUserRecords()),
    fetchAllUser: () => dispatch(fetchAllUser()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Paginate);
