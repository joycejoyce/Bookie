import { Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
    Favorite as ToReadIcon,
    Edit as ReviewedIcon,
    Bookmark as HaveReadIcon
} from '@material-ui/icons/';

const styles = theme => {
    console.log("theme.breakpoints.up('sm')", theme.breakpoints.up('sm'));
    return ({
        tabs: {
            '& .MuiTab-wrapper': {
                gap: '.5rem',
                textTransform: 'capitalize',
                fontSize: '1rem',
                letterSpacing: '1px',
                [theme.breakpoints.up('sm')]: {
                    flexDirection: 'row'
                }
            }
        },
        tab: {
            minHeight: '40px'
        }
    });
}

function LibraryTabs(props) {
    const { tabs, setParentState, classes } = props;
    const { value } = tabs;

    const handleOnChangeTab = (e, tabValue) => {
        setParentState("tabs", "value", tabValue);
    }

    return (
        <Tabs
            classes={{ root: classes.tabs }}
            value={value}
            onChange={handleOnChangeTab}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
        >
            <Tab classes={{ root: classes.tab }} label="To Read" icon={<ToReadIcon />} />
            <Tab classes={{ root: classes.tab }} label="Have Read" icon={<HaveReadIcon />} />
            <Tab classes={{ root: classes.tab }} label="Reviewed" icon={<ReviewedIcon />} />
        </Tabs>
    );
}

export default withStyles(styles)(LibraryTabs);