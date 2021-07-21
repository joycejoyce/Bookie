import React from 'react';
import { List,
    Collapse,
} from "@material-ui/core";
import FilterItem from './FilterItem.js';

const CategoryCollapse = React.memo(({
        classes,
        category,
        handleOnChangeCheckbox,
        isOpen,
        values,
        checkedValues
    }) => {
    // console.log("(CategoryCollapse) render [" + category + "]");

    return (
        <Collapse
            in={isOpen}
            timeout="auto"
            unmountOnExit
        >
            <List component="div" dense={true} disablePadding>
                {
                    values.map((value, idx) => (
                        <FilterItem
                            classes={classes}
                            key={idx}
                            value={value}
                            category={category}
                            checked={checkedValues.includes(value)}
                            onChange={handleOnChangeCheckbox}
                        />
                    ))
                }
            </List>
        </Collapse>
    );
});

export default CategoryCollapse;