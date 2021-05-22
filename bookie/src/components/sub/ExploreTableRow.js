import { Component } from "react";
import { TableRow, TableCell } from '@material-ui/core';

const Thumbnail = (props) => {
    const { thumbnail } = this.props.data.imageLinks;

    return (
        <div className="thumbnail">
            <img src={thumbnail} />
        </div>
    );
}

const BriefBookInfo = (props) => {
    const { title, authors, publisher, publishedDate } = this.props.data;

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
        const { data } = this.props.volumeInfo;

        return (
            <div className="exploreTableRow">
                <TableRow>
                    <TableCell><Thumbnail data={data} /></TableCell>
                    <TableCell><BriefBookInfo data={data} /></TableCell>
                </TableRow>
            </div>
        );
    }
}

export default ExploreTableRow;