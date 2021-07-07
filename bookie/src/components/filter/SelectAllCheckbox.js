import { checkboxTheme } from '../utility/Theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import { ListItem,
    ListItemIcon,
    Checkbox,
    ListItemText
} from "@material-ui/core";

function SelectAllCheckbox({ filter, handleOnChangeSelectAll, classes }) {
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

export default SelectAllCheckbox;