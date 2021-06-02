import { withStyles } from '@material-ui/core/styles';
import { Favorite as FavoriteIcon, Edit as EditIcon, Bookmark as BookmarkIcon } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const styles = theme => ({
    bookStatus: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        columnGap: '.5rem',
        width: 'fit-content'
    },
    iconWrapper: {
        position: 'relative',
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: '50%',
        width: '45px',
        height: '45px',
        background: 'transparent'
    },
    iconBtn: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    icon: {
        fontSize: '18px',
        color: theme.palette.secondary.main
    }
});

function BookStatus(props) {
    const { classes } = props;

    const nameToValue = {
        toRead: false,
        reviewed: false,
        haveRead: false
    }
    
    function getIconWrapperStyle(name) {
        const value = nameToValue[name];
        let background = "white";
        if (value) {
            background = "#FFD166"; 
        }
        return { background };
    }

    function getIcon(name) {
        switch(name) {
            case 'toRead':
                return (<FavoriteIcon className={classes.icon} />)
            case 'reviewed':
                return (<EditIcon className={classes.icon} />)
            case 'haveRead':
                return (<BookmarkIcon className={classes.icon} />)
            default:
                return (<></>)
        }
    }

    const MyIconBtn = (props) => {
        const { name } = props;
        return (
            <div className={classes.iconWrapper} style={getIconWrapperStyle(name)}>
                <IconButton className={classes.iconBtn}>
                    {getIcon(name)}
                </IconButton>
            </div>
        );
    };

    return (
        <div className={classes.bookStatus}>
            {
                Object.keys(nameToValue).map(name => <MyIconBtn key={name} name={name} />)
            }
        </div>
    );
}

export default withStyles(styles)(BookStatus);