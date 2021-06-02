import { Component } from "react";
import TablePagination from '@material-ui/core/TablePagination';

class ExploreTablePagination extends Component {
    handleOnChangePage = (e, page) => {
        const { setParentState } = this.props;
        console.log({ page });
        setParentState("displayInfo", "page", page);
    }

    render() {
        const { displayedItems, displayInfo } = this.props;
        const { page, rowsPerPage, rowsPerPageOptions } = displayInfo;
        const totalItemNum = displayedItems.length;

        return (
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={totalItemNum}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleOnChangePage}
            />
        );
    }
}

export default ExploreTablePagination;