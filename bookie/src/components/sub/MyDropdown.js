import React from "react";
import '../../scss/MyDropdown.scss';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#118AB2'
        }
    }
});
const StyledFormControl = withStyles({
    root: {
        width: '100%',
        height: '40px'
    }
})(FormControl);

const MyDropdown = (props) => {
    //const classes = useStyles();
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const { id } = props;
    return (
        <div id={id} className="myDropdown">
            <ThemeProvider theme={theme}>
                <StyledFormControl>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </StyledFormControl>
            </ThemeProvider>
        </div>
    );
};

export default MyDropdown;