import { Component } from "react";
import "../../scss/ExploreResultTable.scss";
import { Paper, TableContainer, Table, TableBody } from '@material-ui/core';
import ExploreTableRow from "./ExploreTableRow.js";

class ExploreResultTable extends Component {
    render() {
        const { data } = this.props;
        const { items } = data;

        return (
            <div className="exploreResultTable">
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                { items.map(item => <ExploreTableRow data={item} />) }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        );
    }
}

export default ExploreResultTable;
