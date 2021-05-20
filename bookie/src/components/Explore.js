import { Component } from "react";
import '../scss/Explore.scss';
import InputText from "./InputText.js";
import { getClassName_init } from "./InputClassNameGetter.js";
import BtnSection from "./BtnSection";
import searchBook from "../model/BookSearcher.js";
import { Radio, RadioGroup, FormControl, FormControlLabel, TextField } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#118AB2'
        }
    },
    overrides: {
        MuiFormControlLabel: {
            label: {
                /*fontSize: '.875rem',*/
                color: '#073B4C'
            }
        }/*,
        MuiTextField: {
            root: {
                '&'
                outlineColor: '#118AB2'
            }
        }*/
    }
});

const CssTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: '#118AB2'
            },
            width: '296px',
            [theme.breakpoints.up('md')]: {
                width: '466px'
            }
        },
        '& input': {
            color: '#073B4C'
        }
    }
})(TextField);

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: {
                name: "keyword",
                label: "Keyword",
                value: "",
                type: "text",
                isValid: true,
                errMsg: "",
                className: getClassName_init()
            },
            author: {
                id: "author",
                label: "Author",
                checked: false
            },
            title: {
                id: "title",
                label: "Title",
                checked: false
            },
            subject: {
                id: "subject",
                label: "Subject",
                checked: false
            },
            publisher: {
                id: "publisher",
                label: "Publisher",
                checked: false
            },
            isbn: {
                id: "isbn",
                label: "ISBN",
                checked: false
            },
            isFormValid: true,
            value: "author",
            errMsg: ""
        };
    }

    handleOnChange = (e) => {
        const { value, id } = e.target;
        this.setState(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id]
            }
        }));
    }

    handleOnSelect = (e) => {
        const { value } = e.target;
        console.log({ value });
        this.setState(prevState => ({
            ...prevState,
            value,
            [value]: {
                ...prevState[value],
                checked: true
            }
        }));
    }

    handleOnClickRightBtn = () => {
        console.log("author checked?", this.state.author.checked);
        const searchConditions = {
            keyword: this.state.keyword.value,
            checkAuthor: this.state.author.checked,
            checkTitle: this.state.title.checked,
            checkDescription: this.state.description.checked,
            checkPublisher: this.state.publisher.checked,
            checkIsbn: this.state.isbn.checked
        }
        const response = searchBook(searchConditions);
        console.log(response);
    }

    render() {
        const name = "category";
        const radioSize = "small";
        return (
            <div className="explore">
                <div className="contents">
                    <h1>Explore books</h1>
                    {/*<InputText data={this.state.keyword} handleOnChange={this.handleOnChange} />*/}
                    <ThemeProvider theme={theme}>
                        <CssTextField id="textInput"
                            label="Enter keyword"
                            type="text"
                            size="normal"
                            variant="outlined"
                            color="secondary"
                            onChange={this.handleOnChange} />
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" value={this.state.value} onChange={this.handleOnSelect}>
                                <div className="checkSection">
                                    <FormControlLabel value={this.state.author.id} control={<Radio size={radioSize} />} label={this.state.author.label} />
                                    <FormControlLabel value={this.state.title.id} control={<Radio size={radioSize} />} label={this.state.title.label} />
                                    <FormControlLabel value={this.state.subject.id} control={<Radio size={radioSize} />} label={this.state.subject.label} />
                                    <FormControlLabel value={this.state.publisher.id} control={<Radio size={radioSize} />} label={this.state.publisher.label} />
                                    <FormControlLabel value={this.state.isbn.id} control={<Radio size={radioSize} />} label={this.state.isbn.label} />
                                </div>
                                {/*<FormControlLabel control={<Radio />} label="Title" />
                                <FormControlLabel control={<Radio />} label="Subject" />
                                <FormControlLabel control={<Radio />} label="Publisher" />
                                <FormControlLabel control={<Radio />} label="ISBN" />*/}
                            </RadioGroup>
                        </FormControl>
                    </ThemeProvider>
                    {/*<InputCheckbox id={this.state.author.id}
                            label={this.state.author.label}
                            handleOnClick={(e) => this.handleOnCheck(e)}
                        />
                        <InputCheckbox id={this.state.title.id}
                            label={this.state.title.label}
                            handleOnClick={(e) => this.handleOnCheck(e)}
                        />
                        <InputCheckbox id={this.state.description.id}
                            label={this.state.description.label}
                            handleOnClick={(e) => this.handleOnCheck(e)}
                        />
                        <InputCheckbox id={this.state.publisher.id}
                            label={this.state.publisher.label}
                            handleOnClick={(e) => this.handleOnCheck(e)}
                        />
                        <InputCheckbox id={this.state.isbn.id}
                            label={this.state.isbn.label}
                            handleOnClick={(e) => this.handleOnCheck(e)}
                        />*/}
                    <BtnSection leftBtnText="" rightBtnText="Search"
                        handleOnClickRightBtn={this.handleOnClickRightBtn}
                    />
                </div>
            </div>
        );
    }
}

export default Explore;