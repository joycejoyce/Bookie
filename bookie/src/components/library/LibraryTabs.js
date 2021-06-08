import { Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
    Favorite as ToReadIcon,
    Bookmark as HaveReadIcon
} from '@material-ui/icons/';

const styles = theme => ({
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


function LibraryTabs(props) {
    const { tabs, setParentState, classes } = props;
    const { value } = tabs;

    const handleOnChangeTab = (e, tabValue) => {
        console.log({ tabValue });
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
        </Tabs>
    );
}

export default withStyles(styles)(LibraryTabs);