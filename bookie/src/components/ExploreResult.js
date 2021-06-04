import { Component } from "react";
import '../scss/ExploreResult.scss';
import ExploreResultTable from './sub/ExploreResultTable.js';
import ExploreErrorMsg from './sub/ExploreErrorMsg.js';
import FilterModal from './filter/FilterModal.js';
import searchBook from "../model/BookSearcher.js";
import { getFilterBySearchResult } from '../model/BookFilter.js';
import SortByDropdown from './sub/SortByDropdown.js';
import SearchSummary from './sub/SearchSummary.js';

const displayRowsPerPage = 10;

class ExploreResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: {
                name: "sortBy",
                value: "",
                placeholder: "Sort by",
                options: ["Published Date (new ⟶ old)", "Published Date (old ⟶ new)"]
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
                rowsPerPageOptions: [displayRowsPerPage]
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

    setNestedState = (parentName, childName, value, callback) => {
        this.setState(prevState => ({
            ...prevState,
            [parentName]: {
                ...prevState[parentName],
                [childName]: value
            }
        }), callback ? callback : () => {});
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

    async componentDidMount() {
        document.getElementById("loadingIcon").style.display = "block";
        document.querySelector(".exploreResult").style.display = "none";

        await new Promise(r => setTimeout(r, 1));
        await this.setInitStates();

        document.getElementById("loadingIcon").style.display = "none";
        document.querySelector(".exploreResult").style.display = "block";
    }

    async setInitStates() {
        const { searchConditions } = this.props.location.state;
        searchConditions.startIndex = this.state.searchConditions.startIndex;
        searchConditions.maxResults = this.state.searchConditions.maxResults;
        this.setState({ searchConditions }, () => console.log("searchConditions", this.state.searchConditions));
        
        const searchResult = await this.getSearchResult(searchConditions);
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

    render() {
        const { searchConditions } = this.props.location.state;
        const { searchResult, displayInfo, filter } = this.state;
        const { isNormalEnd, errMsg } = searchResult;
        const { auth } = this.props;

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
                            sortBy={this.state.sortBy}
                            displayedItems={this.state.filter.displayedItems}
                            setParentState={this.setNestedState}
                        />
                    </div>
                    {isNormalEnd ?
                        <ExploreResultTable
                            displayedItems={this.state.filter.displayedItems}
                            displayInfo={displayInfo}
                            setParentState={this.setNestedState}
                        />
                        :
                        <ExploreErrorMsg errMsg={errMsg} />
                    }
                </div>
            </div>
        );
    }
}

export default ExploreResult;