import { Component } from "react";
import { TableRow, TableCell } from '@material-ui/core';
import NoImg from "../../assets/noImg.svg";
import BookStatus from "./BookStatus.js";

const Thumbnail = (props) => {
    const { imageLinks } = props.data;
    let thumbnail = NoImg;
    if (imageLinks) {
        thumbnail = imageLinks.thumbnail;
    }

    return (
        <div className="thumbnail">
            <img src={thumbnail} />
        </div>
    );
}

const BookInfo = ({ title, authors, publisher, publishedDate }) => (
    <div className="bookInfo">
        <div className="title">{title}</div>
        <div className="author">{authors.join(", ")}</div>
        <div className="publisher">{publisher}</div>
        <div className="publishedDate">{publishedDate}</div>
    </div>
);

const BookSummary = ({data}) => {
    const { volumeInfo, toRead, haveRead } = data;
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
                toRead={toRead}
                haveRead={haveRead}
            />
        </div>
    );
}

class ExploreTableRow extends Component {
    render() {
        const { volumeInfo, toRead, haveRead } = this.props.data;

        return (
            <TableRow>
                <TableCell><Thumbnail data={volumeInfo} /></TableCell>
                <TableCell><BookSummary data={{volumeInfo, toRead, haveRead}} /></TableCell>
            </TableRow>
        );
    }
}

export default ExploreTableRow;