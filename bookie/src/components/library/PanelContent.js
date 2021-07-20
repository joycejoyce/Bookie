import React, { Component } from 'react';
import { TableContainer, Table, TableBody } from '@material-ui/core';
import EnhancedTableToolbar from './EnhancedTableToolbar.js';
import EnhancedTableHead from './EnhancedTableHead.js';
import { withStyles } from '@material-ui/core/styles';
import LibraryTableRow from './LibraryTableRow.js';

const styles = theme => ({
    root: {
        '& .MuiTableCell-root': {
            color: theme.palette.secondary.main
        }
    },
    wrapper: {
        
    },
    table: {
        width: '100%',
        minWidth: '400px',
    },
    tableContainer: {
        width: '100%',
        overflow: 'auto !important',
        '&::-webkit-scrollbar': {
            height: '8px',
            width: '8px',
            '&::-webkit-overflow-scrolling': 'auto !important',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#8E9699',
            borderRadius: '4px'
        }
    },
    tableRow: {
        letterSpacing: '.5px',
    },
    tableCell: {
        maxWidth: '250px',
        position: 'relative'
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
        const showMoveToHeadReadIcon = id === "toRead";
        console.log({id, showMoveToHeadReadIcon});

        return (
            <div
                id={id}
                className={classes.root}
            >
                {!hidden && (
                    <div className={classes.wraper}>
                        <EnhancedTableToolbar
                            numSelected={numSelected}
                            numTotal={numTotal}
                            ctrl={ctrl}
                            showMoveToHeadReadIcon={showMoveToHeadReadIcon}
                        />
                        <TableContainer className={classes.tableContainer}>
                            <Table className={classes.table}>
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
                                                    rate={items[itemId].rate}
                                                    review={items[itemId].review}
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
                    </div>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(PanelContent);