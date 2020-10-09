import React, {Component} from 'react';
import {fetchAllObjectives, registerObjectives, setObjective} from "../store/modules/objectives/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
class Demo2 extends Component {
    state = {
        array: []
    }
    componentDidMount() {
        this.props.fetchAllObjectives();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.registeredObjectives !== prevProps.registeredObjectives) {
            if(this.props.registeredObjectives && this.props.registeredObjectives.length > 0) {
                let list = [];
                for(let i = 0;i<this.props.registeredObjectives.length;i++) {
                    // list.push(<p>
                    //         {this.props.registeredObjectives[i].ObjectiveId} <br/>
                    //         {this.props.registeredObjectives[i].ProjectId} <br/>
                    //         {this.props.registeredObjectives[i].ObjectiveDescription} <br/>
                    //         {this.props.registeredObjectives[i].ObjectiveDescription} <br/>
                    // </p>
                    // )
                    const objectives = (
                        <ul>
                            {
                                this.props.registeredObjectives.reduce((obj, item) => {
                                 (
                                        this.props.registeredObjectives[item[this.props.registeredObjectives[i].ProjectId]]
                                            =
                                        this.props.registeredObjectives[item[this.props.registeredObjectives[i].ProjectId]]
                                            ||
                                            []).push(item);
                                 return (
                                     <p>
                                         {item.ProjectId}<br/>
                                         {item.ObjectiveId}<br/>
                                     </p>

                                 )
                                }, {})
                            }
                        </ul>
                    )
                    this.setState({
                        array: objectives
                    })
                }

            }
        }
    }

    render() {
        return (
            <div>
                {this.state.array}
            </div>
        );
    }
}

Demo2.propTypes = {
    fetchAllObjectives: PropTypes.func.isRequired,
    registeredObjectives: PropTypes.arrayOf(PropTypes.object).isRequired,

};


const mapStateToProps = state => ({
    registeredObjectives: state.objectives.registeredObjectives,

});



const mapDispatchToProps = dispatch => ({
    fetchAllObjectives: () => dispatch(fetchAllObjectives()),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Demo2);