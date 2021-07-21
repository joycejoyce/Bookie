import "../scss/Library.scss";
import { withStyles } from '@material-ui/core/styles';
import { Component } from "react";
import LibraryTabs from './library/LibraryTabs.js';
import LibraryTabPanels from './library/LibraryTabPanels.js';
import { Paper } from '@material-ui/core';
import SignInReminder from './sub/SignInReminder.js';

const styles = theme => ({
    
});

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
        const { classes, userAuth } = this.props;
        console.log("render Library");

        console.log(userAuth ? "has user" : "no user");

        return (
            <div className="library">
                <div className="contents">
                    {userAuth ? (
                        <>
                            <h1>My Library</h1>
                            <Paper>
                                <LibraryTabs
                                    tabs={this.state.tabs}
                                    setParentState={this.setNestedState}
                                />
                                <LibraryTabPanels
                                    tabs={this.state.tabs}
                                    auth={userAuth}
                                />
                            </Paper>
                        </>
                    ) : (
                        <SignInReminder />
                    )}
                </div>
            </div>
        );
    }
}

// export default Library;
export default withStyles(styles)(Library);