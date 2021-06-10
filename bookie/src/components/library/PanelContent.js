import React, { Component } from 'react';
import { Paper, TableContainer, Table, TableBody } from '@material-ui/core';
import EnhancedTableToolbar from './EnhancedTableToolbar.js';
import EnhancedTableHead from './EnhancedTableHead.js';
import { withStyles } from '@material-ui/core/styles';
import LibraryTableRow from './LibraryTableRow.js';

const styles = theme => ({
    root: {
        width: '100%',
        '& .MuiTableCell-root': {
            color: theme.palette.secondary.main
        }
    },
    tableContainer: {
        '&::-webkit-scrollbar': {
            height: '8px',
            width: '8px'
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#8E9699',
            borderRadius: '4px'
        }
    },
    tableRow: {
        letterSpacing: '.5px'
    },
    tableCell: {
        maxWidth: '250px'
    },
    thumbnail: {
        width: '128px'
    }
});

class PanelContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { data, ctrl, tabIndex, classes } = this.props;
        const { index, id, items, sort, numSelected, allChecked, columns } = data;
        const numTotal = Object.keys(items).length;
        const hidden = (tabIndex !== index);
        const disableSelectAllCheckbox = numTotal === 0;

        return (
            <div
                id={id}
                className={classes.root}
            >
                {!hidden && (
                    <Paper>
                        <EnhancedTableToolbar
                            numSelected={numSelected}
                            numTotal={numTotal}
                            ctrl={ctrl}
                        />
                        <TableContainer className={classes.tableContainer}>
                            <Table
                                className={classes.table}
                            >
                                <EnhancedTableHead
                                    ctrl={ctrl}
                                    sort={sort}
                                    checked={allChecked}
                                    columns={columns}
                                    disabled={disableSelectAllCheckbox}
                                />
                                <TableBody>
                                    {
                                        Object.keys(items).map(itemId => {
                                            return (
                                                <LibraryTableRow
                                                    key={itemId}
                                                    classes={classes}
                                                    ctrl={ctrl}
                                                    id={itemId}
                                                    data={items[itemId]}
                                                    columns={columns}
                                                    checked={items[itemId].checked}
                                                />
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(PanelContent);