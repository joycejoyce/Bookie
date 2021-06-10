import React from 'react';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { checkboxTheme } from '../Theme.js';
import Thumbnail from "../sub/Thumbnail.js";

const LibraryTableRow = React.memo(
({ classes, ctrl, id, data, columns, checked }) => {
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
            {/* <TableCell className={classes.tableCell}>
                <Thumbnail src={thumbnail} classes={classes} />
            </TableCell> */}
            {
                columns.map(column => {
                    const { name } = column;
                    const cellContent = name === "thumbnail" ?
                        <Thumbnail src={thumbnail} classes={classes} /> :
                        data[column.name];
                    return (
                        <TableCell className={classes.tableCell}>
                            {cellContent}
                        </TableCell>
                    );
                })
            }
            {/* <TableCell component="th" className={classes.tableCell}>
                {title}
            </TableCell>
            <TableCell className={classes.tableCell}>
                {author}
            </TableCell> */}
        </TableRow>
    );
});

export default LibraryTableRow;