import { Component } from "react";
import "../../scss/ExploreResultTable.scss";
import { Paper, TableContainer, Table, TableBody } from '@material-ui/core';
import ExploreTableRow from "./ExploreTableRow.js";
import ExploreTablePagination from "./ExploreTablePagination.js";

class ExploreResultTable extends Component {
    getItems = (allItems, displayInfo) => {
        const { page, rowsPerPage } = displayInfo;
        const totalItems = allItems.length;

        const startInd = page * rowsPerPage;
        const endInd = Math.min(startInd + rowsPerPage, totalItems);

        const items = allItems.slice(startInd, endInd);

        return items;
    }

    render() {
        const { displayedItems, displayInfo } = this.props;
        const items = this.getItems(displayedItems, displayInfo);
        // displayInfo: {
        //     page: 0,
        //     rowsPerPage: displayRowsPerPage,
        //     rowsPerPageOptions: [displayRowsPerPage],
        //     onChangePage: this.handleOnChangePage
        // }

        return (
            <div className="exploreResultTable">
                <Paper>
                    <ExploreTablePagination {...this.props} />
                    <TableContainer>
                        <Table>
                            <TableBody>
                                { items.map(item => <ExploreTableRow key={item.id} data={item} />) }
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
