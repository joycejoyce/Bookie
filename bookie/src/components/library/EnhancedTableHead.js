import { TableHead, TableRow, TableCell, Checkbox } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { checkboxTheme } from '../Theme.js';

const useStyle = makeStyles((theme) => ({

}));

function EnhancedTableHead({checked, onChange}) {
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
                <TableCell>
                    Title
                </TableCell>
                <TableCell>
                    Author
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default EnhancedTableHead;