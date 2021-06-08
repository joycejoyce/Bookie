import React, { Component } from 'react';
import { Paper, TableContainer, Table, TableBody, TableRow, TableCell, Checkbox } from '@material-ui/core';
import EnhancedTableToolbar from './EnhancedTableToolbar.js';
import EnhancedTableHead from './EnhancedTableHead.js';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { checkboxTheme } from '../Theme.js';
import { modifyBookInfo_toRead } from '../../model/BookInfoHandlers/BookInfoModifier.js';

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

class ToRead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            allChecked: false,
            numSelected: 0,
            // sort: {
            //     orderBy: 'title',
            //     order: 'asc',
            //     onClickSort: this.handleOnClickSort
            // },
            toolBar: {
                onClickDelete: this.handleOnClickDelete,
                onClickMoveToHaveRead: this.handleOnClickMoveToHaveRead
            }
        }
    }

    resetSelectItems = () => {
        this.setState({ numSelected: 0 });
        this.setState({ allChecked: false });
    }

    handleOnClickDelete = async () => {
        const checkedItemIds = this.getCheckedItemIds();
        console.log({ checkedItemIds });
        // TODO: 
        // const { auth } = this.props;
        // const { username } = auth.user;
        const auth = { username: "test" };
        const result = await modifyBookInfo_toRead({ auth, checkedItemIds }, "delete");
        console.log(result);
        const { items } = this.state;
        checkedItemIds.forEach(id => delete items[id]);
        this.setState({ items });
        this.resetSelectItems();
    }

    getCheckedItemIds = () => {
        const { items } = this.state;
        const ids = Object.keys(items).reduce((accu, key) => {
            const value = items[key];
            const { checked, id } = value;
            if (checked) {
                accu.push(id);
            }
            return accu;
        }, []);
        return ids;
    }

    handleOnClickMoveToHaveRead = async () => {
        const checkedItemIds = this.getCheckedItemIds();
        console.log({ checkedItemIds });
        // TODO: 
        // const { auth } = this.props;
        // const { username } = auth.user;
        const auth = { username: "test" };
        const result = await modifyBookInfo_toRead({ auth, checkedItemIds }, "moveToHaveRead");
        console.log(result);
        const { items } = this.state;
        checkedItemIds.forEach(id => delete items[id]);
        this.setState({ items });
        this.resetSelectItems();
    }

    // handleOnChangeItemCheckbox = (e) => {
    //     const { id, checked } = e.target;
    //     const { items } = this.state;
    //     items[id].checked = checked;
    //     this.setState({ items });
    //     this.setNumSelected();
    // }

    handleOnChangeSelecetAll = (e) => {
        const { checked } = e.target;
        this.setState({ allChecked: checked });
        const { items } = this.state;
        (Object.keys(items)).forEach(key => {
            const item = items[key];
            item.checked = checked;
        });
        this.setState({ items });
        this.setNumSelected();
    }

    setNumSelected = () => {
        const { items } = this.state;
        const numSelected = Object.keys(items).reduce((accu, key) => {
            const { checked } = items[key];
            if (checked) {
                accu = accu + 1;
            }
            return accu;
        }, 0);
        this.setState({ numSelected });
    }

    render() {
        const { allChecked, toolBar } = this.state;
        const { data, ctrl, tabIndex, classes } = this.props;
        const { index, id, items, sort, numSelected } = data;
        const { onCheckItem } = ctrl;
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
                            ctrl={toolBar}
                        />
                        <TableContainer className={classes.tableContainer}>
                            <Table
                                className={classes.table}
                            >
                                <EnhancedTableHead
                                    sort={sort}
                                    checked={allChecked}
                                    onChange={this.handleOnChangeSelecetAll}
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

export default withStyles(styles)(ToRead);