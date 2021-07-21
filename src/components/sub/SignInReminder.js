import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: '1rem',
        marginTop: '15vh'
    },
    link: {
        textDecoration: 'none',
        borderBottom: '.5px solid lightGrey',
        color: '#118AB2',
        padding: '2px',
        '&:hover': {
            color: '#35b0da'
        }
    }
}));

function SignInReminder() {
    const classes = useStyles();
    return (
        <div className={classes.root + " signInReminder"}>
            Please <a href="/signIn" className={classes.link}>sign in</a> first.
        </div>
    )
}

export default SignInReminder;