import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ToReadPanel from './ToRead.js';
import HaveReadPanel from './HaveRead.js';

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: theme.palette.background.paper,
        // width: 500,
    },
}));


function LibraryPanels(props) {
    const { tabs, setParentState, auth } = props;
    const { value } = tabs;
    const theme = useTheme();

    const handleOnChangeIndex = (value) => {
        setParentState("tabs", "value", value);
    }

    return (
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleOnChangeIndex}
        >
            <ToReadPanel auth={auth} value={value} index={0} dir={theme.direction} />
            <HaveReadPanel value={value} index={1} dir={theme.direction} />
        </SwipeableViews>
    );
}

export default LibraryPanels;
// export default withStyles(styles)(LibraryPanels);