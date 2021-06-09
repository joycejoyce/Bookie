import React, { Component } from 'react';
import { Paper, TableContainer, Table, TableBody, TableRow, TableCell, Checkbox } from '@material-ui/core';
import EnhancedTableToolbar from './EnhancedTableToolbar.js';
import EnhancedTableHead from './EnhancedTableHead.js';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { checkboxTheme } from '../Theme.js';

const styles = theme => ({
    root: {
        width: '100%',
        '& .MuiTableCell-root': {
            color: theme.palette.secondary.main
        }
    },
    tableContainer: {
        '&::-webkit-scrollbar': {
            height: '2vmin',
            width: '2vmin'
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#8E9699',
            borderRadius: '1vmin'
        },
        marginBottom: '5vmin'
    },
    table: {
        // minWidth: '480px'
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

const Thumbnail = React.memo(({ src, classes }) => {
    return (
        <div>
            <img src={src} className={classes.thumbnail} />
        </div>
    );
});

const MyTableRow = React.memo(
    ({ classes, id, title, author, thumbnail, onChange, checked }) => {
        console.log(`${id} rendered`);

        return (
            <TableRow
                className={classes.tableRow}
            >
                <ThemeProvider theme={checkboxTheme}>
                    <TableCell padding="checkbox">
                        <Checkbox
                            id={id}
                            disableRipple
                            checked={checked}
                            onChange={onChange}
                        />
                    </TableCell>
                </ThemeProvider>
                <TableCell className={classes.tableCell}>
                    <Thumbnail src={thumbnail} classes={classes} />
                </TableCell>
                <TableCell component="th" className={classes.tableCell}>
                    {title}
                </TableCell>
                <TableCell className={classes.tableCell}>
                    {author}
                </TableCell>
            </TableRow>
        );
    });

class PanelContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { data, ctrl, tabIndex, classes } = this.props;
        const { index, id, items, sort, numSelected, allChecked } = data;
        const { onCheckItem, onCheckSelectAll } = ctrl;
        const numTotal = Object.keys(items).length;
        const hidden = (tabIndex !== index);

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
                                    sort={sort}
                                    checked={allChecked}
                                    onChange={onCheckSelectAll}
                                />
                                <TableBody>
                                    {
                                        Object.keys(items).map(itemId => {
                                            return (
                                                <MyTableRow
                                                    key={itemId}
                                                    classes={classes}
                                                    onChange={onCheckItem}
                                                    id={itemId}
                                                    title={items[itemId].title}
                                                    author={items[itemId].author}
                                                    thumbnail={items[itemId].thumbnail}
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