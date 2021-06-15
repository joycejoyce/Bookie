import { useState } from 'react';
import { Modal, IconButton, Button, TextField } from '@material-ui/core';
import { Edit as EditIcon, FullscreenExit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        // position: 'relative',
        // height: '100%'
        // display: 'flex',
        // height: '100%',
        // flexDirection: 'column',
        // justifyContent: 'space-between'
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%)`,
      width: 'clamp(340px, 90%, 600px)',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '5px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: 'center',
      paddingTop: '40px'
    },
    input: {
        width: '80%'
    },
    btnSection: {
        display: 'flex',
        width: '80%',
        justifyContent: 'space-between',
        margin: '20px auto 0px auto',
        '& *': {
            boxShadow: 'none'
        }
    },
    editIcon: {
        position: 'absolute',
        bottom: '1rem',
        left: '1rem',
        background: '#D6F1FA',
        boxShadow: '1px 1px 2px lightGray'
    }
  }));

const EditReviewModal = ({ open, id, currentReview, ctrl }) => {
    const classes = useStyles();
    const { onOpen, onClose, onClickSave, onChangeReview } = ctrl;

    const body = (
        <div
            className={classes.modal}
        >
            <TextField
                multiline
                rowsMax={15}
                variant="outlined"
                className={classes.input}
                placeholder="Write your review here&#13;(max: 300 characters)"
                value={currentReview}
                onChange={onChangeReview}
            />
            <div className={classes.btnSection}>
                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onClickSave}
                >
                    Save
                </Button>
            </div>
        </div>
    );

    return (
        <div >
            <IconButton onClick={onOpen} className={classes.editIcon}>
                <EditIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={onClose}
                classes={classes}
            >
                {body}
            </Modal>
        </div>
    );
}

function getReviewSubStr(review) {
    console.log({ review });
    const maxLen = 90;
    let subStr = review.substring(0, maxLen);
    if (review.length > maxLen) {
        subStr = subStr + "...";
    }
    return subStr;
}

const Review = ({ id, review, ctrl }) => {
    const { onClickSaveReview } = ctrl;
    const [ isOpen, setIsOpen ] = useState(false);
    const [ currentReview, setCurrentReview ] = useState(review);
    const reviewSubStr = getReviewSubStr(review);

    const handleOnClose = () => {
        setIsOpen(false);
    }

    const handleOnOpen = () => {
        setIsOpen(true);
    }

    const handleOnChangeReview = (e) => {
        const { value } = e.target;
        setCurrentReview(value);
    }

    const handleOnClickSave = () => {
        onClickSaveReview(id, 'review', currentReview);
        setIsOpen(false);
    }

    return (
        <div>
            <div>{reviewSubStr}</div>
            <EditReviewModal
                open={isOpen}
                id={id}
                currentReview={currentReview}
                ctrl={{
                    onClose: handleOnClose,
                    onOpen: handleOnOpen,
                    onClickSave: handleOnClickSave,
                    onChangeReview: handleOnChangeReview
                }}
            />
        </div>
    )
}

export default Review;