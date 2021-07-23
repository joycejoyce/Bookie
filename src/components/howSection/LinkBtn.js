import { LaunchOutlined as LinkIcon } from '@material-ui/icons';
import { Button } from '@material-ui/core';

export default function LinkBtn({text, link}) {
    const handleOnClick = () => {
        window.open(link);
    }

    return (
        <Button
            variant="outlined"
            color="secondary"
            size="large"
            endIcon={<LinkIcon />}
            onClick={handleOnClick}
        >
            {text}
        </Button>
    );
}