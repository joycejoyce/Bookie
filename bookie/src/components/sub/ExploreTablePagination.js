import { Component } from "react";
import TablePagination from '@material-ui/core/TablePagination';

class ExploreTablePagination extends Component {
    render() {
        const { totalItems, displayInfo } = this.props;
        const { page, rowsPerPage, rowsPerPageOptions, onChangePage } = displayInfo;

        return (
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={totalItems}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={onChangePage}
            />
        );
    }
}

export default ExploreTablePagination;