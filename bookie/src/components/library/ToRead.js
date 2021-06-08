import React, { Component } from 'react';
import { Paper, TableContainer, Table, TableBody, TableRow, TableCell, Checkbox } from '@material-ui/core';
import EnhancedTableToolbar from './EnhancedTableToolbar.js';
import EnhancedTableHead from './EnhancedTableHead.js';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { checkboxTheme } from '../Theme.js';
import { getBookInfo_toRead } from '../../model/BookInfoHandlers/BookInfoGetter.js';
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
        }
    },
    table: {
        minWidth: '480px'
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
        console.log({ thumbnail });

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

const getSortedItems = (items, sort) => {
    const { orderBy, order } = sort;
    const dataList = Object.keys(items).map(key => [items[key], items[key][orderBy], key]);
    const comparator = getComparator(order);
    const sortedDataList = dataList.sort(comparator);
    const sortedItems = sortedDataList.reduce((accu, data) => {
        const [item, orderByValue, key] = data;
        accu = {
            ...accu,
            [key]: item
        };
        return accu;
    }, {});
    return sortedItems;
}

const getComparator = (order) => {
    return order === 'desc'
        ? (a, b) => descComparator(a, b)
        : (a, b) => -descComparator(a, b);
}

const descComparator = (a, b) => {
    return b[1].localeCompare(a[1]);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

class ToRead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            items: {},
            allChecked: false,
            numSelected: 0,
            sort: {
                orderBy: 'title',
                order: 'asc',
                onClickSort: this.handleOnClickSort
            },
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

    handleOnClickSort = (e, newOrderBy) => {
        const { sort, items } = this.state;
        const { orderBy, order } = sort;
        const isAsc = (orderBy === newOrderBy && order === 'asc');
        const newOrder = isAsc ? 'desc' : 'asc';
        const newSort = {
            ...sort,
            orderBy: newOrderBy,
            order: newOrder
        };
        this.setState({ sort: newSort });

        const sortedItems = getSortedItems(items, newSort);
        this.setState({ items: sortedItems });
    }

    getFakeData = () => {
        const numAry = Array.from(Array(10).keys());
        const items = numAry.reduce((accu, num) => {
            const numStr = num.toString();
            const key = "id".concat(numStr);
            const value = {
                checked: false,
                title: 'Title'.concat(' ', getRandomInt(100)),
                author: 'Author'.concat(' ', getRandomInt(100)),
                thumbnail: ''
            };
            accu = {
                ...accu,
                [key]: value
            };
            return accu;
        }, {});
        const sortedData = getSortedItems(items, this.state.sort);
        return sortedData;
    }

    getBookInfo_byAuth = async () => {
        // const { auth } = this.props;
        const auth = { username: "test" };
        const { items } = await getBookInfo_toRead(auth);
        console.log({ items });
        const sortedData = getSortedItems(items, this.state.sort);
        return sortedData;
    }

    async componentDidMount() {
        const { value, index } = this.props;
        this.setState({ hidden: value !== index });
        const initItems = await this.getBookInfo_byAuth();
        this.setState({ items: initItems }, () => {
            console.log("initItems", this.state.items);
        });
    }

    handleOnChangeItemCheckbox = (e) => {
        const { id, checked } = e.target;
        const { items } = this.state;
        items[id].checked = checked;
        this.setState({ items });
        this.setNumSelected();
    }

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
        const { items, hidden, allChecked, numSelected, sort, toolBar } = this.state;
        const numTotal = Object.keys(items).length;
        const { classes } = this.props;

        return (
            <div
                id="toRead"
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
                                                    onChange={this.handleOnChangeItemCheckbox}
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