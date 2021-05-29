import { Component } from "react";
import '../scss/ExploreResult.scss';
import ExploreResultTable from './sub/ExploreResultTable.js';
import ExploreErrorMsg from './sub/ExploreErrorMsg.js';
import FilterModal from './sub/FilterModal.js';
import searchBook from "../model/BookSearcher.js";
import { Select, FormControl, MenuItem, FormHelperText } from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles';
import { getFilterBySearchResult } from '../model/BookFilter.js';

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

function SearchSummary(props) {
    const { searchConditions, searchResult, filter } = props;
    const { searchCondition, searchKeyword } = searchConditions;
    const totalItemNum = searchResult.items.length;
    const displayedItemNum = filter.displayedItems.length;
    const filteredItemNum = totalItemNum - displayedItemNum;
    return (
        <div className="summary searchSummary">
            Keyword : <strong className="summaryPoint">{searchKeyword}</strong>
            &nbsp;
            (<span className="summaryPoint">{searchCondition}</span>)
            <br />
            Total : <span className="summaryPoint">{totalItemNum}</span>
            <br />
            Filtered out : <span className="summaryPoint">{filteredItemNum}</span>
            <br />
        </div>
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
            },
            filter:{
                isSelectAll: true,
                author: {
                    label: "Author",
                    isOpen: false,
                    values: [],
                    checkedValues: []
                },
                publisher: {
                    label: "Publisher",
                    isOpen: false,
                    values: [],
                    checkedValues: []
                },
                subject: {
                    label: "Subject",
                    isOpen: false,
                    values: [],
                    checkedValues: []
                },
                displayedItems: []
            }
        };
    }

    handleOnChange = (e) => {
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

        console.log({searchConditions});
        const searchResult = this.getSearchResult(searchConditions);
        this.setSearchResult(searchResult);

        this.setFilter(searchResult);
    }

    setFilter = (searchResult) => {
        const origFilter = getFilterBySearchResult(searchResult);
        const filter = {
            ...this.state.filter,
            ...origFilter
        };
        this.setState({ filter });
    }

    handleOnChangePage = (e, page) => {
        console.log({ page });
        this.setNestedState("displayInfo", "page", page);
    }

    getStartIndex = (page) => {
        const { rowsPerPage } = this.state.displayInfo;
        return page * rowsPerPage;
    }

    render() {
        const { classes } = this.props;
        const { searchConditions } = this.props.location.state;
        const { searchResult, displayInfo, filter } = this.state;
        const { isNormalEnd, errMsg } = searchResult;

        return (
            <div className="exploreResult">
                <div className="contents">
                    <SearchSummary
                        searchConditions={searchConditions}
                        searchResult={searchResult}
                        filter={filter}
                    />
                    <div className="filterAndSort">
                        <FilterModal
                            filter={this.state.filter}
                            displayRowsPerPage={displayRowsPerPage}
                            allItems={this.state.searchResult.items}
                            setParentState={this.setNestedState}
                        />                        
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
                        <ExploreResultTable
                            displayedItems={this.state.filter.displayedItems}
                            displayInfo={displayInfo} />
                        :
                        <ExploreErrorMsg errMsg={errMsg} />
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ExploreResult);