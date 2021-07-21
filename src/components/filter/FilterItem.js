import React from 'react';
import { ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox
} from "@material-ui/core";
import { checkboxTheme } from '../utility/Theme.js';
import { ThemeProvider } from '@material-ui/core/styles';

const FilterItem = React.memo(({ value, category, checked, onChange, classes }) => {
    // console.log("render FilterItem [" + value + "]");
    return (
        <ListItem>
            <ListItemIcon>
                <ThemeProvider theme={checkboxTheme}>
                    <Checkbox
                        checked={checked}
                        disableRipple
                        color="primary"
                        onChange={(e) => onChange(e, category, value)}
                    />
                </ThemeProvider>
            </ListItemIcon>
            <ListItemText className={classes.listItemText} primary={value} />
        </ListItem>
    );
});

export default FilterItem;