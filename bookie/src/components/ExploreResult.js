import { Component } from "react";
import '../scss/ExploreResult.scss';
import MyTextField from './sub/MyTextField.js';
import MyDropdown from './sub/MyDropdown.js';
import SearchIcon from './icon/Search.js';
import ExploreResultTable from './sub/ExploreResultTable.js';
import ExploreErrorMsg from './sub/ExploreErrorMsg.js';
import { ReactComponent as FilterIcon } from '../assets/filter.svg';
import searchBook from "../model/BookSearcher.js";
import { Button } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const filterTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#073B4C'
        }
    }
});

const displayRowsPerPage = 3;

class ExploreResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const { value, id } = e.target;
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
                    <ThemeProvider theme={filterTheme}>
                        <Button variant="outlined" color="primary">
                            <FilterIcon className="filterIcon" />
                        </Button>
                    </ThemeProvider>
                    {/* <div className="filterAndSort">
                        <FilterIcon className="filter" />
                        <div className="sort">
                            <div className="sortLabel">Sort by:&ensp;</div>
                            <MyDropdown id="sortDropdown" />
                        </div>
                    </div> */}
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

export default ExploreResult;