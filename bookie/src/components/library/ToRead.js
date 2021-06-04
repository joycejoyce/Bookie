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
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: '100%'
    },
    tableRow: {
        letterSpacing: '.5px'
    }
});

const MyTableRow = React.memo(
    ({ classes, id, title, author, onChange, checked }) => {
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
            <TableCell component="th">
                {title}
            </TableCell>
            <TableCell>
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
            }
        }
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
                author: 'Author'.concat(' ', getRandomInt(100))
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

    componentDidMount() {
        const { value, index } = this.props;
        this.setState({ hidden: value !== index });
        const initItems = this.getFakeData();
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
        const { items, hidden, allChecked, numSelected, sort } = this.state;
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
                        />
                        <TableContainer>
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