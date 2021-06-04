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
                categories.map(category => (
                    <div key={category}>
                        <CategoryCollapseBtn category={category}  {...props} />
                        <CategoryCollapse category={category}  {...props} />
                    </div>
                ))
            }
        </List>
    )
}

export default FilterList;