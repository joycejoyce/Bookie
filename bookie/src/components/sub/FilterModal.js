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
    function SelectAllCheckbox(props) {
        const { filter, handleOnChangeSelectAll } = props;
        const { isSelectAll } = filter;
        return (
            <ListItem>
                <ListItemIcon>
                    <ThemeProvider theme={checkboxTheme}>
                        <Checkbox checked={isSelectAll} disableRipple onChange={handleOnChangeSelectAll} />
                    </ThemeProvider>
                </ListItemIcon>
                <ListItemText className={classes.selectAll} primary="Select all" />
            </ListItem>
        );
    }

    function CategoryItem(props) {
        const { classes, handleOnClickCategory, category, filter } = props;

        return (
            <ListItem button onClick={() => handleOnClickCategory(category)}>
                <ListItemText className={classes.listItemText}
                    primary={`${filter[category].label} (${filter[category].checkedItems.length} / ${filter[category].items.length})`}
                />
                {filter[category].isOpen ? <MinusIcon /> : <AddIcon />}
            </ListItem>
        );
    }

    function CategoryCollapse(props) {
        const { classes, category, filter, handleOnChangeCheckbox } = props;

        return (
            <Collapse
                in={filter[category].isOpen}
                timeout="auto"
                unmountOnExit
            >
                <List component="div" dense={true} disablePadding>
                    {
                        filter[category].items.map(item => (
                            <ListItem>
                                <ListItemIcon>
                                    <ThemeProvider theme={checkboxTheme}>
                                        <Checkbox
                                            checked={filter[category].checkedItems.includes(item)}
                                            disableRipple
                                            onChange={(e) => handleOnChangeCheckbox(e, category, item)}
                                        />
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

    const { classes, filter } = props;
    console.log({ filter });
    const { categories } = filter;
    console.log({ categories });
    return (
        <List component={Paper} className={classes.paper}>
            <SelectAllCheckbox {...props} />
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
            isModalOpen: false
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

    handleOnClickCategory = (category) => {
        const { filter, setParentState } = this.props;
        const { isOpen } = filter[category];
        setParentState("filter", category, {
            ...filter[category],
            isOpen: !isOpen
        });
    }

    handleOnChangeCheckbox = (e, category, name) => {
        const { checked } = e.target;
        const { filter, setParentState } = this.props;

        let { checkedItems } = filter[category];
        if (checked) {
            checkedItems = [...checkedItems, name];
        }
        else {
            checkedItems = checkedItems.filter(item => item !== name);
        }
        setParentState("filter", category, {
            ...filter[category],
            checkedItems
        });
    }

    handleOnClickFilter = () => {
        this.setState({ isModalOpen: true });
    }

    handleOnCloseModal = () => {
        this.setState({ isModalOpen: false });
    }

    handleOnChangeSelectAll = (e) => {
        const { checked } = e.target;
        const { filter, setParentState } = this.props;
        const { categories } = filter;
        const parentName = "filter";
        setParentState(parentName, "isSelectAll", checked);
        let displayedItems = [];
        categories.forEach(category => {
            let checkedItems = [];
            if (checked) {
                checkedItems = filter[category].items;
            }
            setParentState(parentName, category, {...filter[category], checkedItems});
            const addedItems = this.getDisplayedItemsByFilter(category, checkedItems);
            displayedItems = this.addDisplayeditems(displayedItems, addedItems);
        });
        
    }

    getDisplayedItemsByFilter = (category, checkedItems) => {

    }

    addDisplayeditems = (origItems, addedItems) => {

    }

    render() {
        const { classes, filter } = this.props;

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
                        filter={filter}
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