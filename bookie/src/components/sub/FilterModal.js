import { Component } from "react";
import '../../scss/FilterModal.scss';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Button, Modal, Paper, List, ListItem, ListItemText, ListItemIcon, Checkbox, Collapse } from "@material-ui/core";
import { Add as AddIcon, Remove as MinusIcon } from '@material-ui/icons';
import { ReactComponent as OrigFilterIcon } from '../../assets/filter.svg';
import styled from "@emotion/styled";

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#118AB2'
        }
    }
});

const styles = theme => ({
    filterBtn: {
        width: '128px',
        height: '40px',
        borderRadius: '20px'
    },
    modal: {
        // outline: 0,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: 'fit-content',
        maxHeight: '80vmin',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '2vmin'
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.secondary.main,
            borderRadius: '1vmin'
        }
    },
    collapse: {
    }
});

const FilterIcon = styled(OrigFilterIcon)`
    fill: #073B4C;
    width: 20px;
`;

function FilterList(props) {
    const { classes, categoryState, handleOnClickCategory, handleOnChangeCheckbox } = props;
    const categories = ["subject", "author", "publisher"];
    console.log({classes});
    console.log("classes.paper", classes.paper);

    return (
        <List component={Paper} className={classes.paper}>
            {
                categories.map(category => (
                    <div className="listItem">
                        <div className="category">
                            <ListItem button onClick={(e) => handleOnClickCategory(e, category)}>
                                <ListItemText primary={categoryState[category].label} />
                                {categoryState[category].isOpen ? <MinusIcon /> : <AddIcon />}
                            </ListItem>
                        </div>
                        <Collapse
                            classes={classes.collapse}
                            in={categoryState[category].isOpen}
                            timeout="auto"
                            unmountOnExit
                        >
                            <div className="categoryItems">
                                <List component="div" dense={true} disablePadding>
                                    {
                                        categoryState[category].items.map(item => (
                                            <ListItem>
                                                <ListItemIcon>
                                                    <ThemeProvider theme={theme}>
                                                        <Checkbox disableRipple onChange={(e) => handleOnChangeCheckbox(e, category, item)} />
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
    )
}

class FilterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
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

    handleOnClickFilter = () => {
        console.log("handleOnClickFilter");
        this.setState({ isOpen: true });
    }

    handleOnCloseModal = () => {
        this.setState({ isOpen: false });
    }

    render() {
        console.log("checkedItems", this.state.checkedItems);
        const categoryState = {
            author: this.state.author,
            publisher: this.state.publisher,
            subject: this.state.subject
        };
        const { classes } = this.props;

        return (
            <div className="filterModal">
                <Button
                    classes={{ root: classes.filterBtn }}
                    variant="outlined"
                    color="secondary"
                    onClick={this.handleOnClickFilter}
                >
                    <FilterIcon />
                </Button>
                <Modal
                    classes={{ root: classes.modal }}
                    open={this.state.isOpen}
                    onClose={this.handleOnCloseModal}
                >
                    <FilterList
                        classes={classes}
                        handleOnClickCategory={this.handleOnClickCategory}
                        handleOnChangeCheckbox={this.handleOnChangeCheckbox}
                        categoryState={categoryState}
                    />
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(FilterModal);