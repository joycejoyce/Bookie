import { Toolbar, Tooltip, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon, Bookmark as BookmarkIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    title: {
        flex: '1 1 100%',
        color: theme.palette.secondary.main
    }
}));

const bkStyle = (shouldHightlight) => {
    let color = '#F2F2F2';
    if (shouldHightlight) {
        color = 'rgb(250, 224, 233)';
    }
    return {
        background: color
    };
}

const highlightStyle = (shouldHightlight, component) => {
    let style = {};
    switch (component) {
        case 'title':
            style = getStyle_title(shouldHightlight);
            break;
        case 'bookmark':
            style = getStyle_icon(shouldHightlight);
            break;
        case 'delete':
            style = getStyle_icon(shouldHightlight);
            break;
        default:
            console.error(`Unexpected compoent: ${component}`);
            break;
    }
    return style;
    // let color = 'currentColor';
    // if (isTitle) {
    //     color = '#073B4C';
    // }
    // if (shouldHightlight) {
    //     color = '#EF476F';
    // }
    // return {
    //     color
    // };
};

const getStyle_title = shouldHightlight => {
    let color = '#073B4C';
    if (shouldHightlight) {
        color = '#EF476F';
    }
    return {
        color
    };
}

const getStyle_icon = shouldHightlight => {
    let color = 'currentColor';
    if (shouldHightlight) {
        color = '#EF476F';
    }
    return {
        color
    };
}

function EnhancedTableToolbar({ numSelected, ctrl }) {
    const classes = useStyles();
    const shouldHightlight = numSelected > 0;
    const { onClickDelete } = ctrl;
    
    return (
        <Toolbar
            className={classes.root}
            style={bkStyle(shouldHightlight)}
        >
            <p
                className={classes.title + " toolbarTitle"}
                style={highlightStyle(shouldHightlight, 'title')}
            >
                {numSelected} selected
            </p>
            <Tooltip title='Move to "Have Read"'>
                <IconButton disabled={!shouldHightlight}>
                    <BookmarkIcon style={highlightStyle(shouldHightlight, 'bookmark')} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton onClick={onClickDelete} disabled={!shouldHightlight}>
                    <DeleteIcon style={highlightStyle(shouldHightlight, 'delete')} />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
    // {numSelected > 0 ? (
        //     <Toolbar>
        //         EnhancedTableToolbar
        //     </Toolbar>
        // ):(<div></div>)}
}

export default EnhancedTableToolbar;