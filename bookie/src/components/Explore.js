import { Component } from "react";
import '../scss/Explore.scss';
import { getClassName_init } from "./InputClassNameGetter.js";
import BtnSection from "./BtnSection";
import searchBook from "../model/BookSearcher.js";
import { Radio, RadioGroup, FormControl, FormControlLabel } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import MyTextField from './sub-components/MyTextField.js';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#118AB2'
        }
    },
    overrides: {
        MuiFormControlLabel: {
            label: {
                color: '#073B4C'
            }
        }
    }
});

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: {
                id: "keyword",
                label: "Keyword",
                value: "",
                type: "text",
                isValid: true,
                errMsg: "",
                className: getClassName_init()
            },
            author: {
                id: "author",
                label: "Author"
            },
            title: {
                id: "title",
                label: "Title"
            },
            subject: {
                id: "subject",
                label: "Subject"
            },
            publisher: {
                id: "publisher",
                label: "Publisher"
            },
            isbn: {
                id: "isbn",
                label: "ISBN"
            },
            isFormValid: true,
            condition: "author",
            errMsg: ""
        };
    }

    handleOnChange = (e) => {
        const { value, id } = e.target;
        this.setState(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                value
            }
        }));
    }

    handleOnSelect = (e) => {
        const { value } = e.target;
        this.setState(prevState => ({
            ...prevState,
            condition: value
        }));
    }

    handleOnClickRightBtn = () => {
        const searchConditions = {
            keyword: this.state.keyword.value,
            condition: this.state.condition
        }
        const searchResult = searchBook(searchConditions);
        console.log({searchResult});
    }

    render() {
        const radioSize = "small";
        return (
            <div className="explore">
                <div className="contents">
                    <h1>Explore books</h1>
                    <MyTextField id={this.state.keyword.id}
                        label={this.state.keyword.label}
                        value={this.state.keyword.value}
                        handleOnChange={this.handleOnChange}
                    />
                    <ThemeProvider theme={theme}>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" value={this.state.condition} onChange={this.handleOnSelect}>
                                <div className="checkSection">
                                    <FormControlLabel value={this.state.author.id} control={<Radio size={radioSize} />} label={this.state.author.label} />
                                    <FormControlLabel value={this.state.title.id} control={<Radio size={radioSize} />} label={this.state.title.label} />
                                    <FormControlLabel value={this.state.subject.id} control={<Radio size={radioSize} />} label={this.state.subject.label} />
                                    <FormControlLabel value={this.state.publisher.id} control={<Radio size={radioSize} />} label={this.state.publisher.label} />
                                    <FormControlLabel value={this.state.isbn.id} control={<Radio size={radioSize} />} label={this.state.isbn.label} />
                                </div>
                            </RadioGroup>
                        </FormControl>
                    </ThemeProvider>
                    <BtnSection leftBtnText="" rightBtnText="Search"
                        handleOnClickRightBtn={this.handleOnClickRightBtn}
                    />
                </div>
            </div>
        );
    }
}

export default Explore;