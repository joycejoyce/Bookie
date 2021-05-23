import { Component } from "react";
import { TableRow, TableCell } from '@material-ui/core';
import NoImg from "../../assets/noImg.svg";

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

const BriefBookInfo = (props) => {
    let { title, authors, publisher, publishedDate } = props.data;
    title = title ? title : "";
    authors = authors ? authors : [];
    publisher = publisher ? publisher : "";
    publishedDate = publishedDate ? publishedDate : "";

    return (
        <div className="briefBookInfo">
            <div className="title">{title}</div>
            <div className="author">{authors.join(", ")}</div>
            <div className="publisher">{publisher}</div>
            <div className="publishedDate">{publishedDate}</div>
        </div>
    );
}

class ExploreTableRow extends Component {
    render() {
        const { volumeInfo } = this.props.data;

        return (
            <TableRow>
                <TableCell><Thumbnail data={volumeInfo} /></TableCell>
                <TableCell><BriefBookInfo data={volumeInfo} /></TableCell>
            </TableRow>
        );
    }
}

export default ExploreTableRow;