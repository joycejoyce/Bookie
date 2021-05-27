import { Component } from "react";
// import '../../scss/FilterModal.scss';
// import '../../scss/App.scss';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Button, Modal, Paper, List, ListItem, ListItemText, ListItemIcon, Checkbox, Collapse } from "@material-ui/core";
import { Add as AddIcon, Remove as MinusIcon } from '@material-ui/icons';
import { ReactComponent as OrigFilterIcon } from '../../assets/filter.svg';
import styled from "@emotion/styled";

const checkboxTheme = createMuiTheme({
    palette: {
        secondary: {
            main: '#EF476F'
        }
    }
});

const styles = theme => ({
    filterBtn: {
        width: '128px',
        height: '40px',
        borderRadius: '20px'
    },
    paper: {
        position: 'absolute',
        width: 'clamp(290px, 80vmin, 500px)',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '80vmin',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '1vmin'
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.secondary.main,
            borderRadius: '.5vmin'
        }
    },
    listItemText: {
        '& .MuiListItemText-primary': {
            fontFamily: 'Montserrat-SemiBold',
            color: theme.palette.secondary.main
        }
    },
    selectAll: {
        '& .MuiListItemText-primary': {
            fontFamily: 'Montserrat-SemiBold',
            fontSize: '0.875rem',
            color: theme.palette.secondary.main
        }
    }
});

const FilterIcon = styled(OrigFilterIcon)`
    fill: #073B4C;
    width: 20px;
`;

function FilterList(props) {
    function SelectAllCheckbox() {
        const { selectAll, handleOnChangeSelectAll } = props;
        return (
            <ListItem>
                <ListItemIcon>
                    <ThemeProvider theme={checkboxTheme}>
                        <Checkbox checked={selectAll} disableRipple onChange={handleOnChangeSelectAll} />
                    </ThemeProvider>
                </ListItemIcon>
                <ListItemText className={classes.selectAll} primary="Select all" />
            </ListItem>
        );
    }

    function CategoryItem(props) {
        const { classes, handleOnClickCategory, category, categoryState, checkedItems } = props;

        return (
            <ListItem button onClick={(e) => handleOnClickCategory(e, category)}>
                <ListItemText className={classes.listItemText}
                    primary={`${categoryState[category].label} (${checkedItems[category].length} / ${categoryState[category].items.length})`}
                />
                {categoryState[category].isOpen ? <MinusIcon /> : <AddIcon />}
            </ListItem>
        );
    }

    function CategoryCollapse(props) {
        const { classes, categoryState, checkedItems, category, handleOnChangeCheckbox } = props;

        return (
            <Collapse
                in={categoryState[category].isOpen}
                timeout="auto"
                unmountOnExit
            >
                <List component="div" dense={true} disablePadding>
                    {
                        categoryState[category].items.map(item => (
                            <ListItem>
                                <ListItemIcon>
                                    <ThemeProvider theme={checkboxTheme}>
                                        <Checkbox checked={checkedItems[category].includes(item)} disableRipple onChange={(e) => handleOnChangeCheckbox(e, category, item)} />
                                    </ThemeProvider>
                                </ListItemIcon>
                                <ListItemText className={classes.listItemText} primary={item} />
                            </ListItem>
                        ))
                    }
                </List>
            </Collapse>
        );
    }

    function CategoryList(props) {
        return (
            <>
                <CategoryItem {...props} />
                <CategoryCollapse {...props} />
            </>
        )
    }

    const { classes, categories } = props;
    return (
        <List component={Paper} className={classes.paper}>
            <SelectAllCheckbox />
            {
                categories.map(category => <CategoryList category={category} {...props}/>)
            }
        </List>
    )
}

class FilterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            selectAll: false,
            // categories: ["author", "publisher", "subject"],
            // checkedItems: {
            //     author: [],
            //     publisher: [],
            //     subject: []
            // },
            // author: {
            //     label: "Author",
            //     isOpen: false,
            //     items: ["Charles Babbage", "David Baddiel", "David Baddiel", "David Baddiel", "David Baddiel", "David Baddiel", "David Baddiel", "David Baddiel", "David Baddiel"]
            // },
            // publisher: {
            //     label: "Publisher",
            //     isOpen: false,
            //     items: ["A & C Black", "Taunton Press", "Vintage Books", "Vintage Books", "Vintage Books", "Vintage Books", "Vintage Books", "Vintage Books"]
            // },
            // subject: {
            //     label: "Subject",
            //     isOpen: false,
            //     items: ["Self-Help", "Juvenile Nonfiction"]
            // }
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
        this.setState({ isOpen: true });
    }

    handleOnCloseModal = () => {
        this.setState({ isOpen: false });
    }

    handleOnChangeSelectAll = (e) => {
        const { checked } = e.target;
        if (checked) {
            this.setState({ selectAll: true });
            this.state.categories.forEach(category => {
                this.setNestedState("checkedItems", category, this.state[category].items);
            });
        }
        else {
            this.setState({ selectAll: false });
            this.state.categories.forEach(category => {
                this.setNestedState("checkedItems", category, []);
            });
        }
    }

    render() {
        const categoryState = {
            author: this.state.author,
            publisher: this.state.publisher,
            subject: this.state.subject
        };
        const { classes } = this.props;

        return (
            <>
                <Button
                    classes={{ root: classes.filterBtn }}
                    variant="outlined"
                    color="secondary"
                    onClick={this.handleOnClickFilter}
                >
                    <FilterIcon />
                </Button>
                <Modal
                    open={this.state.isModalOpen}
                    onClose={this.handleOnCloseModal}
                >
                    <FilterList
                        classes={classes}
                        checkedItems={this.state.checkedItems}
                        selectAll={this.state.selectAll}
                        categories={this.state.categories}
                        categoryState={categoryState}
                        handleOnClickCategory={this.handleOnClickCategory}
                        handleOnChangeCheckbox={this.handleOnChangeCheckbox}
                        handleOnChangeSelectAll={this.handleOnChangeSelectAll}
                    />
                </Modal>
            </>
        );
    }
}

export default withStyles(styles)(FilterModal);