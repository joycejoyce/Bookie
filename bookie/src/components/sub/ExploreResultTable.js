import { Component } from "react";
import "../../scss/ExploreResultTable.scss";
import { Paper, TableContainer, Table, TableBody } from '@material-ui/core';
import ExploreTableRow from "./ExploreTableRow.js";
import ExploreTablePagination from "./ExploreTablePagination.js";

class ExploreResultTable extends Component {
    render() {
        const { displayedItems: items, displayInfo } = this.props;
        const totalItems = items;

        return (
            <div className="exploreResultTable">
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                { items.map(item => <ExploreTableRow key={item.id} data={item} />) }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ExploreTablePagination totalItems={totalItems} displayInfo={displayInfo} />
                </Paper>
            </div>
        );
    }
}

export default ExploreResultTable;
