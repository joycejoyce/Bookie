import { Component } from "react";
import '../scss/Explore.scss';
import { getClassName_init } from "./utility/InputClassNameGetter.js";
import BtnSection from "./sub/BtnSection";
import { TextField, Radio, RadioGroup, FormControl, FormControlLabel } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    label: {
        color: theme.palette.secondary.main
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main
            }
        },
        '& input': {
            color: theme.palette.secondary.main
        }
    }
});

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exploreResult: null,
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
            searchKeyword: this.state.keyword.value,
            searchCondition: this.state.condition
        }
        this.props.history.push({
            pathname: '/exploreResult',
            state: { searchConditions }
        });
    }

    render() {
        const { classes } = this.props;
        const options = ["author", "title", "subject", "publisher", "isbn"];
        const radioSize = "small";
        return (
            <div className="explore">
                <div className="contents">
                    <h1>Explore Books</h1>
                    <div className="searchCondSection">
                        <TextField
                            classes={{root: classes.textField}}
                            id={this.state.keyword.id}
                            label={this.state.keyword.label}
                            value={this.state.keyword.value}
                            variant="outlined"
                            onChange={this.handleOnChange}
                        />
                        <FormControl component="fieldset" >
                            <RadioGroup aria-label="gender" value={this.state.condition} onChange={this.handleOnSelect}>
                                <div className="checkSection">
                                    {
                                        options.map(opt => (
                                            <FormControlLabel
                                                key={opt}
                                                classes={{label: classes.label}}
                                                value={this.state[opt].id}
                                                control={<Radio size={radioSize} color="primary" />}
                                                label={this.state[opt].label}
                                            />
                                        ))
                                    }
                                </div>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <BtnSection leftBtnText="" rightBtnText="Search"
                        handleOnClickRightBtn={this.handleOnClickRightBtn}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Explore);