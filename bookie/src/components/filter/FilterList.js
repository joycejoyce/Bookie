import { Paper,
    List
} from "@material-ui/core";
import SelectAllCheckbox from './SelectAllCheckbox.js';
import CategoryCollapse from './CategoryCollapse.js';
import CategoryCollapseBtn from './CategoryCollapseBtn.js';
import { categories } from '../../model/BookFilter.js';

function FilterList(props) {
    const { classes } = props;

    return (
        <List component={Paper} className={classes.paper}>
            <SelectAllCheckbox {...props} />
            {
                categories.map(category => {
                    const { filter, handleOnClickCategory, handleOnChangeCheckbox } = props;
                    const { label, checkedValues, values, isOpen } = filter[category];
                    const checkedValuesNum = checkedValues.length;
                    const valuesNum = values.length;
                    return (
                        <div key={category}>
                            <CategoryCollapseBtn
                                category={category}
                                label={label}
                                checkedValuesNum={checkedValuesNum}
                                valuesNum={valuesNum}
                                isOpen={isOpen}
                                handleOnClickCategory={handleOnClickCategory}
                                classes={classes}
                            />
                            <CategoryCollapse 
                                classes={classes}
                                category={category}
                                handleOnChangeCheckbox={handleOnChangeCheckbox}
                                isOpen={isOpen}
                                values={values}
                                checkedValues={checkedValues}
                            />
                        </div>
                    );
                })
            }
        </List>
    )
}

export default FilterList;