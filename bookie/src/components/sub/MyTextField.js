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
        let { id, label, value, handleOnChange, size } = this.props;
        if (!size) {
            size = "medium";
        }
        return (
            <ThemeProvider theme={theme}>
                <CssTextField id={id}
                    label={label}
                    type="text"
                    size={size}
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