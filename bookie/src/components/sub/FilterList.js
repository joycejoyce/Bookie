import { Component } from "react";
import '../../scss/FilterList.scss';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Paper, List, ListItem, ListItemText, ListItemIcon, Checkbox, Collapse } from "@material-ui/core";
import { Add as AddIcon, Remove as MinusIcon } from '@material-ui/icons';
import { pink } from '@material-ui/core/colors';
import Font_MontserratRegular from '../../fonts/Montserrat/Montserrat-Regular.ttf';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#118AB2'
        }
    }
});

class FilterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedItems: {
                author: [],
                publisher: [],
                subject: []
            },
            author: {
                label: "Author",
                isOpen: true,
                items: ["Charles Babbage", "David Baddiel", "David Baddiel", "David Baddiel", "David Baddiel", "David Baddiel", "David Baddiel", "David Baddiel", "David Baddiel"]
            },
            publisher: {
                label: "Publisher",
                isOpen: false,
                items: ["A & C Black", "Taunton Press", "Vintage Books", "Vintage Books", "Vintage Books", "Vintage Books", "Vintage Books", "Vintage Books"]
            },
            subject: {
                label: "Subject",
                isOpen: false,
                items: ["Self-Help", "Juvenile Nonfiction"]
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

    handleOnChangeCheckbox = (e, category, name) => {
        const { checked } = e.target;
        let checkedItems = this.state.checkedItems[category];
        if (checked) {
            checkedItems = [...checkedItems, name];
        }
        else {
            checkedItems = checkedItems.filter(item => item !== name);
        }
        this.setState(prevState => ({
            ...prevState,
            checkedItems: {
                ...prevState.checkedItems,
                [category]: checkedItems
            }
        }));
    }

    render() {
        console.log("checkedItems", this.state.checkedItems);
        const categories = ["subject", "author", "publisher"];
        return (
            <div className="filterList">
                <div className="contents">
                    <List component={Paper}>
                        {
                            categories.map(category => (
                                <div className="listItem">
                                    <div className="category">
                                        <ListItem button onClick={(e) => this.handleOnClickCategory(e, category)}>
                                            <ListItemText primary={this.state[category].label} />
                                            {this.state[category].isOpen ? <MinusIcon /> : <AddIcon />}
                                        </ListItem>
                                    </div>
                                    <Collapse in={this.state[category].isOpen} timeout="auto" unmountOnExit>
                                        <div className="categoryItems">
                                            <List component="div" dense={true} disablePadding>
                                                {
                                                    this.state[category].items.map(item => (
                                                        <ListItem>
                                                            <ListItemIcon>
                                                                <ThemeProvider theme={theme}>
                                                                    <Checkbox disableRipple onChange={(e) => this.handleOnChangeCheckbox(e, category, item)} />
                                                                </ThemeProvider>
                                                            </ListItemIcon>
                                                            <ListItemText primary={item} />
                                                        </ListItem>
                                                    ))
                                                }
                                            </List>
                                        </div>
                                    </Collapse>
                                </div>)
                            )
                        }
                    </List>
                </div>
            </div>
        );
    }
}

export default FilterList;