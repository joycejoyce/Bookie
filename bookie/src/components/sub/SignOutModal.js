import React from 'react';
import { Modal, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    body: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '2rem 2rem',
        background: 'white',
        borderRadius: '10px',
        color: theme.palette.secondary.main,
        width: '380px',
        textAlign: 'center'
    },
    btnSection: {
        width: '60%',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '2rem auto 0 auto',
        '& a': {
            textDecoration: 'none'
        }
    }
});

const SignOutModal = React.memo(({ isOpen, ctrl, classes }) => {
    console.log("render SignOutModal");
    const { onClose, doSignOut } = ctrl;

    const handleOnClickYes = () => {
        onClose();
        doSignOut();
    }

    const body = (
        <div className={classes.body}>
            <p>Are you sure you want to sign out?</p>
            <div className={classes.btnSection}>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    color="primary"
                >
                    No
                </Button>
                <a href="/" onClick={handleOnClickYes}>
                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Yes
                    </Button>
                </a>
            </div>
        </div>
    );

    return (
        <Modal
            className="signOutModal"
            open={isOpen}
            onClose={onClose}
        >
            {body}
        </Modal>
    );
});

export default withStyles(styles)(SignOutModal);