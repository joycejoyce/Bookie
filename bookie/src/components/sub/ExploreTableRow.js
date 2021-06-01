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

const BookSummary = (props) => {
    let { title, authors, publisher, publishedDate } = props.data;
    title = title ? title : "";
    authors = authors ? authors : [];
    publisher = publisher ? publisher : "";
    publishedDate = publishedDate ? publishedDate : "";

    const BookInfo = () => (
        <div className="bookInfo">
            <div className="title">{title}</div>
            <div className="author">{authors.join(", ")}</div>
            <div className="publisher">{publisher}</div>
            <div className="publishedDate">{publishedDate}</div>
        </div>
    );

    return (
        <div className="bookSummary">
            <BookInfo />
            <BookStatus />
        </div>
    );
}

class ExploreTableRow extends Component {
    render() {
        const { volumeInfo } = this.props.data;

        return (
            <TableRow>
                <TableCell><Thumbnail data={volumeInfo} /></TableCell>
                <TableCell><BookSummary data={volumeInfo} /></TableCell>
            </TableRow>
        );
    }
}

export default ExploreTableRow;