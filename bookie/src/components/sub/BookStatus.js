import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Favorite as FavoriteIcon, Bookmark as BookmarkIcon } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const styles = theme => ({
    bookStatus: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
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

function getIconWrapperStyle(status) {
    let background = "white";
    if (status) {
        background = "#FFD166"; 
    }
    return { background };
}

function getIcon(name, classes) {
    switch(name) {
        case 'toRead':
            return (<FavoriteIcon className={classes.icon} />)
        case 'haveRead':
            return (<BookmarkIcon className={classes.icon} />)
        default:
            return (<></>)
    }
}

const MyIconBtn = ({ id, name, status, handleOnClick, classes }) => {
    return (
        <div className={classes.iconWrapper} style={getIconWrapperStyle(status)}>
            <IconButton
                className={classes.iconBtn}
                onClick={() => handleOnClick(id, name)}
            >
                {getIcon(name, classes)}
            </IconButton>
        </div>
    );
};

const BookStatus = React.memo(({ id, toRead, haveRead, handleOnClickBookStatus, classes }) => {
    return (
        <div className={classes.bookStatus}>
            <MyIconBtn
                id={id}
                name="toRead"
                status={toRead}
                handleOnClick={handleOnClickBookStatus}
                classes={classes}
            />
            <MyIconBtn
                id={id}
                name="haveRead"
                status={haveRead}
                handleOnClick={handleOnClickBookStatus}
                classes={classes}
            />
        </div>
    );
});

export default withStyles(styles)(BookStatus);