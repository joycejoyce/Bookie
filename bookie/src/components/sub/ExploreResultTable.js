import { Component } from "react";
import "../../scss/ExploreResultTable.scss";
import { Paper, TableContainer, Table, TableBody } from '@material-ui/core';
import ExploreTableRow from "./ExploreTableRow.js";
import ExploreTablePagination from "./ExploreTablePagination.js";

class ExploreResultTable extends Component {
    getItems = (items, displayInfo) => {
        const { page, rowsPerPage } = displayInfo;
        const totalItems = items.length;

        const startInd = page * rowsPerPage;
        const endInd = Math.min(startInd + rowsPerPage, totalItems);

        const items_sliced = items.slice(startInd, endInd);

        return items_sliced;
    }

    render() {
        const { displayedItems, displayInfo, handleOnClickBookStatus } = this.props;
        const { showBookStatus } = displayInfo;
        const items = this.getItems(displayedItems, displayInfo);
        // displayInfo: {
        //     page: 0,
        //     rowsPerPage: displayRowsPerPage,
        //     rowsPerPageOptions: [displayRowsPerPage]
        // }

        return (
            <div className="exploreResultTable">
                <Paper>
                    <ExploreTablePagination {...this.props} />
                    <TableContainer>
                        <Table>
                            <TableBody>
                                { items.map((item, idx) => (
                                    <ExploreTableRow
                                        key={idx}
                                        data={item}
                                        handleOnClickBookStatus={handleOnClickBookStatus}
                                        showBookStatus={showBookStatus}
                                    />
                                )) }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ExploreTablePagination {...this.props} />
                </Paper>
            </div>
        );
    }
}

export default ExploreResultTable;
