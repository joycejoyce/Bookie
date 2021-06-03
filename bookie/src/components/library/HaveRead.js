import { withStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const styles = theme => ({
});

function HaveRead(props) {
    const { value, index } = props;
    const hidden = value !== index
    return (
        <div
            id="toRead"
            hidden={hidden}
        >
            {!hidden && (
                <Box p={3}>
                    Have Read
                </Box>
            )}
        </div>
    );
}

export default withStyles(styles)(HaveRead);