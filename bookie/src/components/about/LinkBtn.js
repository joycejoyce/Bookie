import { Button } from '@material-ui/core';
import { LaunchOutlined as LinkIcon } from '@material-ui/icons';

export default function LinkBtn({text, link}) {
    return (
        <div className="linkBtn">
            <a href={link} target="_blank">
                <div className="text">
                    Bookie's
                    <br />
                    {text}
                </div>
                <LinkIcon />
            </a>
        </div>
    );
}