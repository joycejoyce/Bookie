import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, IconButton } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { checkboxTheme } from '../Theme.js';
// import { FilterListSharp as FilterIcon } from '@material-ui/icons';

const useStyle = makeStyles((theme) => ({
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    tableCell: {
        position: 'relative'
    },
    tableHead: {
        color: theme.palette.secondary.main
    },
    // filter: {
    //     cursor: 'pointer',
    //     position: 'absolute',
    //     right: '.3rem',
    //     top: '50%',
    //     transform: 'translateY(-50%)'
    // },
    // filterIcon: {
    //     fontSize: '1.25rem'
    // }
}));

const headCells = [
    { id: 'thumbnail', label: 'Cover' },
    { id: 'title', label: 'Title' },
    { id: 'author', label: 'Author' }    
];

function EnhancedTableHead({ sort, checked, onChange }) {
    const { orderBy, order, onClickSort } = sort;
    console.log({ sort });
    const classes = useStyle();
    const createSortHandler = (sortByProp) => (e) => {
        onClickSort(e, sortByProp);
    }
    return (
        <TableHead>
            <TableRow>
                <ThemeProvider theme={checkboxTheme}>
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={checked}
                            onChange={onChange}
                        />
                    </TableCell>
                </ThemeProvider>
                {headCells.map(cell => {
                    const isSortByThis = orderBy === cell.id;
                    const sortDirection = isSortByThis ? order : false;
                    const direction = isSortByThis ? order : 'asc';
                    return (
                        <TableCell
                            key={cell.id}
                            align='left'
                            sortDirection={sortDirection}
                            classes={{root: classes.tableCell}}
                        >
                            <TableSortLabel
                                active={orderBy === cell.id}
                                direction={direction}
                                onClick={createSortHandler(cell.id)}
                            >
                                <span className={classes.tableHead}>{cell.label}</span>
                                {isSortByThis ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                            {/* <IconButton
                                disableRipple={true}
                                className={classes.filter}
                            >
                                <FilterIcon className={classes.filterIcon} />
                            </IconButton> */}
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    )
}

export default EnhancedTableHead;