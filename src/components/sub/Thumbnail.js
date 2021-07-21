import React from 'react';
import NoImgCover from "../sub/NoImgCover.js";

const Thumbnail = React.memo(({ src }) => {
    return (
        <>
        {src.startsWith("http") ?
            (<div>
                <img src={src} />
            </div>) :
            (<NoImgCover contents={src} />)
        }
        </>
    );
});

export default Thumbnail;