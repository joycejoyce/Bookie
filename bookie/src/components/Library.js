import "../scss/Library.scss";
import { Component } from "react";
import LibraryTabs from './library/LibraryTabs.js';
import LibraryTabPanels from './library/LibraryTabPanels.js';
import { Paper } from '@material-ui/core';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: {
                value: 0
            }
        }
    }

    setNestedState = (parentName, childName, value, callback) => {
        this.setState(prevState => ({
            ...prevState,
            [parentName]: {
                ...prevState[parentName],
                [childName]: value
            }
        }), callback ? callback : () => {});
    }

    render() {
        console.log("render Library");
        return (
            <div className="library">
                <div className="contents">
                    <h1>My Library</h1>
                    <Paper>
                        <LibraryTabs
                            tabs={this.state.tabs}
                            setParentState={this.setNestedState}
                        />
                        <LibraryTabPanels
                            tabs={this.state.tabs}
                            auth={this.props.auth}
                        />
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Library;