import { Component } from "react";
import { TextField } from "@material-ui/core";
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#118AB2'
        }
    }
});

const CssTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: '#118AB2'
            }
        },
        '& input': {
            color: '#073B4C'
        }
    }
})(TextField);

class MyTextField extends Component {
    render() {
        const { id, label, value, handleOnChange } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <CssTextField id={id}
                    label={label}
                    type="text"
                    size="medium"
                    variant="outlined"
                    color="primary"
                    value={value}
                    onChange={handleOnChange}
                />
            </ThemeProvider>
        );
    }
}

export default MyTextField;