import React from 'react';
import { ListItem,
    ListItemText
} from "@material-ui/core";
import { Add as AddIcon, Remove as MinusIcon } from '@material-ui/icons';

const CategoryCollapseBtn = React.memo(({ 
        classes,
        handleOnClickCategory,
        category,
        label,
        checkedValuesNum,
        valuesNum,
        isOpen
    }) => {
    // console.log("(CategoryCollapseBtn) render [" + category + "]");
    return (
        <ListItem button onClick={() => handleOnClickCategory(category)}>
            <ListItemText className={classes.listItemText}
                primary={`${label} (${checkedValuesNum} / ${valuesNum})`}
            />
            {isOpen ? <MinusIcon /> : <AddIcon />}
        </ListItem>
    );
});

export default CategoryCollapseBtn;