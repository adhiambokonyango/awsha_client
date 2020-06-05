import React, {Component} from 'react';
import { fetchAllProjects} from "../../store/modules/projects/actions";

class ProjectDisplay extends Component {
    state = {
        projects: [],
    };

    componentDidMount() {
        this.props.fetchAllProjects();
    }


    render() {
        return (
            <div>

            </div>
        );
    }
}

export default ProjectDisplay;