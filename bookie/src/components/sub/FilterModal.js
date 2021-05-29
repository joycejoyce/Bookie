import { Component } from "react";
// import '../../scss/FilterModal.scss';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Button, Modal, Paper, List, ListItem, ListItemText, ListItemIcon, Checkbox, Collapse } from "@material-ui/core";
import { Add as AddIcon, Remove as MinusIcon } from '@material-ui/icons';
import { ReactComponent as OrigFilterIcon } from '../../assets/filter.svg';
import { categories, getDisplayedItems_add, getDisplayedItems_remove } from '../../model/BookFilter.js';
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
                    primary={`${filter[category].label} (${filter[category].checkedValues.length} / ${filter[category].values.length})`}
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
                        filter[category].values.map(value => (
                            <ListItem>
                                <ListItemIcon>
                                    <ThemeProvider theme={checkboxTheme}>
                                        <Checkbox
                                            checked={filter[category].checkedValues.includes(value)}
                                            disableRipple
                                            onChange={(e) => handleOnChangeCheckbox(e, category, value)}
                                        />
                                    </ThemeProvider>
                                </ListItemIcon>
                                <ListItemText className={classes.listItemText} primary={value} />
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

    handleOnChangeCheckbox = (e, category, value) => {
        const { checked } = e.target;
        this.setCheckedValues_onChangeCheckbox(checked, category, value);
        this.setDisplayedItems_onChangeCheckbox(checked, category, value);
    }

    setCheckedValues_onChangeCheckbox = (checked, category, value) => {
        const { filter, setParentState } = this.props;
        let { checkedValues } = filter[category];
        if (checked) {
            checkedValues = [...checkedValues, value];
        }
        else {
            checkedValues = checkedValues.filter(checkedValue => checkedValue !== value);
        }
        setParentState("filter", category, {
            ...filter[category],
            checkedValues
        });
    }

    setDisplayedItems_onChangeCheckbox = (checked, category, value) => {
        const { filter, allItems, setParentState } = this.props;
        const { displayedItems } = filter;
        let displayedItems_modified = [];
        if (checked) {
            displayedItems_modified = getDisplayedItems_add(displayedItems, allItems, category, value);
        }
        else {
            displayedItems_modified = getDisplayedItems_remove(displayedItems, category, value);
        }
        setParentState("filter", "displayedItems", displayedItems_modified);
    }

    handleOnClickFilter = () => {
        this.setState({ isModalOpen: true });
    }

    handleOnCloseModal = () => {
        this.setState({ isModalOpen: false });
    }

    handleOnChangeSelectAll = (e) => {
        const { checked } = e.target;
        const { filter, allItems, setParentState } = this.props;
        const parentName = "filter";
        setParentState(parentName, "isSelectAll", checked);
        categories.forEach(category => {
            let checkedValues = [];
            if (checked) {
                checkedValues = filter[category].values;
            }
            setParentState(parentName, category, {...filter[category], checkedValues});
        });
        this.setDisplayedItems_onChangeSelectAll(checked, allItems, parentName, setParentState);
    }

    setDisplayedItems_onChangeSelectAll = (checked, allItems, parentName, setParentState) => {
        if (checked) {
            setParentState(parentName, "displayedItems", allItems);
        }
        else {
            setParentState(parentName, "displayedItems", []);
        }
    }

    render() {
        const { classes } = this.props;
        console.log("filter", this.props.filter);

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
                        {...this.props}
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