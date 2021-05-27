import { Component } from "react";
import '../scss/ExploreResult.scss';
import MyTextField from './sub/MyTextField.js';
import MyDropdown from './sub/MyDropdown.js';
import SearchIcon from './icon/Search.js';
import ExploreResultTable from './sub/ExploreResultTable.js';
import ExploreErrorMsg from './sub/ExploreErrorMsg.js';
import FilterModal from './sub/FilterModal.js';
import searchBook from "../model/BookSearcher.js";
import { Button, Select, FormControl, MenuItem, FormHelperText } from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    sortByDropdown: {
        width: '200px',
        color: theme.palette.secondary.main
    },
    sortByDropdownItem: {
        color: theme.palette.secondary.main
    },
    formControl: {
        margin: theme.spacing(1)
    }
});

const displayRowsPerPage = 10;

function SortByDropdown(props) {
    const { name, value, handleOnChange, options, placeholder, classes } = props;

    return (
        <FormControl classes={{root: classes.formControl}}>
            <FormHelperText>{placeholder}</FormHelperText>
            <Select
                name={name}
                value={value}
                onChange={handleOnChange}
                displayEmpty
                classes={{root: classes.sortByDropdown}}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {
                    options.map(opt => (
                        <MenuItem classes={{root: classes.sortByDropdownItem}} key={opt} value={opt}>{opt}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
}

class ExploreResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: {
                name: "sortBy",
                value: "",
                placeholder: "Sort by",
                options: ["Published Date (new > old)", "Published Date (old > new)"]
            },
            keyword: {
                id: "keyword",
                label: "Keyword",
                value: ""
            },
            searchConditions: {
                keyword: "",
                condition: "",
                startIndex: 0,
                maxResults: displayRowsPerPage
            },
            displayInfo: {
                page: 0,
                rowsPerPage: displayRowsPerPage,
                rowsPerPageOptions: [displayRowsPerPage],
                onChangePage: this.handleOnChangePage
            },
            searchResult: {
                isNormalEnd: true,
                errMsg: "",
                totalItems: 0,
                items: []
            }
        };
    }

    handleOnChange = (e) => {
        console.log("target", e.target);
        let { value, id } = e.target;
        if (!id) {
            id = e.target.name;
        }
        this.setNestedState(id, "value", value);
    }

    setNestedState = (parentName, childName, value) => {
        this.setState(prevState => ({
            ...prevState,
            [parentName]: {
                ...prevState[parentName],
                [childName]: value
            }
        }));
    }

    getSearchResult = (searchConditions) => {
        return searchBook(searchConditions);
    }

    setSearchResult = (searchResult) => {
        const { isNormalEnd, errMsg, response } = searchResult;

        // searchResult: {
        //     isNormalEnd: true,
        //     errMsg: "",
        //     page: 0,
        //     startIndex: 0,
        //     totalItems: 0,
        //     items: []
        // }
        this.setNestedState("searchResult", "isNormalEnd", isNormalEnd);
        if (isNormalEnd) {
            const { totalItems, items } = response;
            this.setNestedState("searchResult", "totalItems", totalItems);
            this.setNestedState("searchResult", "items", items);
        }
        else {
            this.setNestedState("searchResult", "errMsg", errMsg);
        }
    }

    componentDidMount() {
        const { searchConditions } = this.props.location.state;
        searchConditions.startIndex = this.state.searchConditions.startIndex;
        searchConditions.maxResults = this.state.searchConditions.maxResults;
        this.setState({ searchConditions });

        const searchResult = this.getSearchResult(searchConditions);
        this.setSearchResult(searchResult);
    }

    handleOnChangePage = (e, page) => {
        const startIndex = this.getStartIndex(page);
        const { searchConditions } = this.state;
        searchConditions.startIndex = startIndex;
        const searchResult = this.getSearchResult(searchConditions);
        this.setNestedState("displayInfo", "page", page);
        this.setSearchResult(searchResult);
    }

    getStartIndex = (page) => {
        const { rowsPerPage } = this.state.displayInfo;
        return page * rowsPerPage;
    }

    render() {
        const { classes } = this.props;
        const { searchKeyword, searchCondition } = this.props.location.state.searchConditions;
        const { searchResult, displayInfo } = this.state;
        const { isNormalEnd, errMsg, totalItems } = searchResult;

        return (
            <div className="exploreResult">
                <div className="contents">
                    {/* <div className="searchSection">
                        <MyTextField id={this.state.keyword.id}
                            label={this.state.keyword.label}
                            value={this.state.keyword.value}
                            size="small"
                            handleOnChange={this.handleOnChange}
                        />
                        <MyDropdown id="searchCondDropdown" />
                        <SearchIcon className="searchIcon" />
                    </div> */}
                    <div className="summary">
                        Keyword ({searchCondition}) : <span className="assignedKeyword">{searchKeyword}</span>
                        <br />
                        Total : <span className="totalItems">{totalItems}</span>
                    </div>
                    <div className="filterAndSort">
                        <FilterModal />
                        <SortByDropdown
                            classes={classes}
                            name={this.state.sortBy.name}
                            value={this.state.sortBy.value}
                            handleOnChange={this.handleOnChange}
                            options={this.state.sortBy.options}
                            placeholder={this.state.sortBy.placeholder}
                        />
                    </div>
                    {isNormalEnd ?
                        <ExploreResultTable searchResult={searchResult} displayInfo={displayInfo} />
                        :
                        <ExploreErrorMsg errMsg={errMsg} />
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ExploreResult);