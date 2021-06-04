import { List,
    Collapse,
} from "@material-ui/core";
import FilterItem from './FilterItem.js';

function CategoryCollapse({ classes, category, filter, handleOnChangeCheckbox }) {
    console.log("(CategoryCollapse) render [" + category + "]");

    return (
        <Collapse
            in={filter[category].isOpen}
            timeout="auto"
            unmountOnExit
        >
            <List component="div" dense={true} disablePadding>
                {
                    filter[category].values.map((value, idx) => (
                        <FilterItem
                            classes={classes}
                            key={idx}
                            value={value}
                            category={category}
                            checked={filter[category].checkedValues.includes(value)}
                            onChange={handleOnChangeCheckbox}
                        />
                    ))
                }
            </List>
        </Collapse>
    );
}

export default CategoryCollapse;