import React, {Component} from 'react';
import CheckboxGroup from "react-checkbox-group";
import {Checkbox} from "@material-ui/core";
class Demo1 extends Component {
    state = {
        fruits:['apple', 'pears']
    }

    handleChange = () => {
        this.setState({
            fruits:['apple', 'pears']
        })
    }

    render() {
        return (
            <div>
                <CheckboxGroup name="fruits" value={this.state.fruits} onChange={this.handleChange}>
                    {
                        (Checkbox) => (
                            <>
                                <label>
                                    <Checkbox value={this.state.fruits} />
                                </label>
                            </>
                        )
                    }

                </CheckboxGroup>
            </div>
        );
    }
}


export default Demo1;