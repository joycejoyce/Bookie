import { withStyles } from '@material-ui/core/styles';
import { Select, FormControl, MenuItem, FormHelperText } from "@material-ui/core"

const styles = theme => ({
    sortByDropdown: {
        width: '180px',
        color: theme.palette.secondary.main,
        '&:focus': {
            background: 'transparent'
        },
        fontSize: '.875rem'
    },
    sortByDropdownItem: {
        color: theme.palette.secondary.main,
        fontSize: '.875rem'
    }
});

function SortByDropdown(props) {
    console.log("render SortByDropdown");
    const { sortBy, classes, setParentState } = props;
    const { name, value, placeholder, options } = sortBy;

    const handleOnChange = (e) => {
        const { value } = e.target;
        setParentState("sortBy", "value", value);
    
        const [ newToOld, oldToNew ] = options;
        let { displayedItems } = props;
        console.log("before", {displayedItems});

        let sortedItems = getSortedItems(displayedItems, "publishedDate");
        switch (value) {
            case newToOld:
                displayedItems = sortedItems.reverse();
                break;
            case oldToNew:
                displayedItems = sortedItems;
                break;
            default:
                console.error("Unexpected sort choice:", value);
                break;
        }
        console.log("after", {displayedItems});

        setParentState("filter", "displayedItems", displayedItems);
        setParentState("displayInfo", "page", 0);
    }

    return (
        <FormControl>
            <FormHelperText>{placeholder}</FormHelperText>
            <Select
                name={name}
                value={value}
                onChange={handleOnChange}
                displayEmpty
                classes={{root: classes.sortByDropdown}}
            >
                {
                    options.map(opt => (
                        <MenuItem className={classes.sortByDropdownItem} key={opt} value={opt}>{opt}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
}

function getSortedItems(items, fieldName) {
    const oldestDate = "0000";
    return items.sort((a, b) => {
        let aVal = a.volumeInfo[fieldName];
        aVal = aVal ? aVal : oldestDate;
        let bVal = b.volumeInfo[fieldName];
        bVal = bVal ? bVal : oldestDate;
        return aVal.localeCompare(bVal);
    });
}

export default withStyles(styles)(SortByDropdown);