import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '128px',
        height: '180px',
        position: 'relative',
        background: '#D6F1FA',
        color: theme.palette.primary.main
    },
    contents: {
        width: '90%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: '90%',
        overflow: 'hidden'
    }
});

function NoImgCover({ classes, contents }) {
    const modifiedContents = contents;
    return (
        <div className={classes.root}>
            <div className={classes.contents}>{modifiedContents}</div>
        </div>
    );
}

export default withStyles(styles)(NoImgCover);