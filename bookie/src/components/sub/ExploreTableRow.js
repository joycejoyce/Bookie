import React, { Component } from "react";
import { TableRow, TableCell } from '@material-ui/core';
// import NoImg from "../../assets/noImg.svg";
import { NoImgPath } from '../../config.json';
import BookStatus from "./BookStatus.js";

const Thumbnail = React.memo(({ src }) => {
    return (
        <div className="thumbnail">
            <img src={src} />
        </div>
    );
});

const BookInfo = React.memo(({ title, authors, publisher, publishedDate }) => {
    return (
        <div className="bookInfo">
            <div className="title">{title}</div>
            <div className="author">{authors.join(", ")}</div>
            <div className="publisher">{publisher}</div>
            <div className="publishedDate">{publishedDate}</div>
        </div>
    );
});

const BookSummary = ({ handleOnClickBookStatus, data }) => {
    const { id, volumeInfo, toRead, haveRead } = data;
    let { title, authors, publisher, publishedDate } = volumeInfo;
    title = title ? title : "";
    authors = authors ? authors : [];
    publisher = publisher ? publisher : "";
    publishedDate = publishedDate ? publishedDate : "";

    return (
        <div className="bookSummary">
            <BookInfo
                title={title}
                authors={authors}
                publisher={publisher}
                publishedDate={publishedDate}
            />
            <BookStatus
                id={id}
                toRead={toRead}
                haveRead={haveRead}
                handleOnClickBookStatus={handleOnClickBookStatus}
            />
        </div>
    );
};

function getThumbnailSrc(volumeInfo) {
    const { imageLinks } = volumeInfo;
    let thumbnail = NoImgPath;
    if (imageLinks) {
        thumbnail = imageLinks.thumbnail;
    }
    return thumbnail;
}

class ExploreTableRow extends Component {
    render() {
        const { handleOnClickBookStatus, data } = this.props;
        const thumbnail = getThumbnailSrc(data.volumeInfo);

        return (
            <TableRow>
                <TableCell><Thumbnail src={thumbnail} /></TableCell>
                <TableCell>
                    <BookSummary
                        data={data}
                        handleOnClickBookStatus={handleOnClickBookStatus}
                    />
                </TableCell>
            </TableRow>
        );
    }
}

export default ExploreTableRow;