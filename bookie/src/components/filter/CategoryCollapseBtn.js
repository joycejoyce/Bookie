import React from 'react';
import { ListItem,
    ListItemText
} from "@material-ui/core";
import { Add as AddIcon, Remove as MinusIcon } from '@material-ui/icons';

const CategoryCollapseBtn = React.memo((props) => {
    const { classes, handleOnClickCategory, category, filter } = props;
    console.log("render [" + filter[category].label + "]");

    return (
        <ListItem button onClick={() => handleOnClickCategory(category)}>
            <ListItemText className={classes.listItemText}
                primary={`${filter[category].label} (${filter[category].checkedValues.length} / ${filter[category].values.length})`}
            />
            {filter[category].isOpen ? <MinusIcon /> : <AddIcon />}
        </ListItem>
    );
});

export default CategoryCollapseBtn;