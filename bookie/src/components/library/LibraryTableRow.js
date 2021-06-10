import React from 'react';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { checkboxTheme } from '../Theme.js';
import Thumbnail from "../sub/Thumbnail.js";
import Rate from "./Rate.js";

const styles = theme => ({
    wrapper: {
        marginBottom: '5vmin'
    }
});

const LibraryTableRow = React.memo(
({ classes, ctrl, id, rate, data, columns, checked }) => {
    console.log(`${id} rendered`);
    const { onCheckItem } = ctrl;
    const { thumbnail } = data;

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
                        onChange={onCheckItem}
                    />
                </TableCell>
            </ThemeProvider>
            {
                columns.map(column => {
                    const { name } = column;
                    let cellContent = null;
                    switch (name) {
                        case 'thumbnail':
                            cellContent = <Thumbnail src={thumbnail} classes={classes} />
                            break;
                        case 'rate':
                            cellContent = <Rate id={id} rate={rate} ctrl={ctrl} />
                            break;
                        default:
                            cellContent = data[column.name];
                            break;
                    }
                    return (
                        <TableCell className={classes.tableCell}>
                            {cellContent}
                        </TableCell>
                    );
                })
            }
        </TableRow>
    );
});

export default LibraryTableRow;