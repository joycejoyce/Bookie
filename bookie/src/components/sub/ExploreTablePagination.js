import { Component } from "react";
import TablePagination from '@material-ui/core/TablePagination';

class ExploreTablePagination extends Component {
    render() {
        const { displayedItems, displayInfo } = this.props;
        const { page, rowsPerPage, rowsPerPageOptions, onChangePage } = displayInfo;
        const totalItemNum = displayedItems.length;

        return (
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={totalItemNum}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={onChangePage}
            />
        );
    }
}

export default ExploreTablePagination;