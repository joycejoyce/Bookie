import { Component } from "react";
import '../../scss/FilterList.scss';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox, Collapse } from "@material-ui/core";
import { Add as AddIcon, Remove as MinusIcon } from '@material-ui/icons';

class FilterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: {
                isOpen: false
            }
        }
    }

    setNestedState = (parentName, childName, value) => {
        this.setState(prevState => ({
            ...prevState,
            [parentName]: {
                ...prevState[parentName],
                [childName]: value
            }
        }));
    }

    handleOnClickCategory = (e, category) => {
        const isOpen = this.state[category].isOpen;
        this.setNestedState(category, "isOpen", !isOpen);
    }

    render() {
        return (
            <div className="filterList">
                <List component="div">
                    <ListItem button onClick={(e) => this.handleOnClickCategory(e, "author")}>
                        <ListItemText primary="Author" />
                        {this.state.author.isOpen ? <MinusIcon /> : <AddIcon />}
                    </ListItem>
                    <Collapse in={this.state.author.isOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem>
                                <ListItemIcon>
                                    <Checkbox />
                                </ListItemIcon>
                                <ListItemText primary="Charles Babbage" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

export default FilterList;