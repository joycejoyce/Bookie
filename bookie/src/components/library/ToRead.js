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

class ToRead extends Component {
    state = {
        hidden: true,
        items: {},
        allChecked: false
    }

    getFakeData = () => {
        const numAry = Array.from(Array(10).keys());
        const data = numAry.reduce((accu, num) => {
            const numStr = num.toString();
            const key = "id".concat(numStr);
            const value = {
                checked: false,
                title: 'Title'.concat(' ', numStr),
                author: 'Author'.concat(' ', numStr)
            };
            accu = {
                ...accu,
                [key]: value
            };
            return accu;
        }, {});
        return data;
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
    }

    render() {
        const { items, hidden, allChecked } = this.state;
        const { classes } = this.props;
        return (
            <div
                id="toRead"
                className={classes.root}
            >
                {!hidden && (
                    <Paper>
                        {/* <EnhancedTableToolbar /> */}
                        <TableContainer>
                            <Table
                                className={classes.table}
                            >
                                <EnhancedTableHead
                                    checked={allChecked}
                                    onChange={this.handleOnChangeSelecetAll}
                                />
                                <TableBody>
                                    {
                                        (Object.keys(items)).map(itemId => {
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