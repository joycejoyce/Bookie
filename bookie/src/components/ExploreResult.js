import { Component } from "react";
import '../scss/ExploreResult.scss';
import MyTextField from './sub/MyTextField.js';
import MyDropdown from './sub/MyDropdown.js';
import SearchIcon from './icon/Search.js';
import ExploreResultTable from './sub/ExploreResultTable.js';
import ExploreErrorMsg from './sub/ExploreErrorMsg.js';
import { ReactComponent as FilterIcon } from '../assets/filter.svg';
import { checkIsNormalEnd, getResponse } from "../model/HttpReqSender.js";

class ExploreResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: {
                id: "keyword",
                label: "Keyword",
                value: ""
            }
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

    render() {
        const { exploreResult, searchConditions } = this.props;
        const isExploreNormalEnd = checkIsNormalEnd(exploreResult);
        let exploreData = null;
        if (isExploreNormalEnd) {
            exploreData = getResponse(exploreResult);
        }

        return (
            <div className="exploreResult">
                <div className="contents">
                    <div className="searchSection">
                        <MyTextField id={this.state.keyword.id}
                            label={this.state.keyword.label}
                            value={this.state.keyword.value}
                            size="small"
                            handleOnChange={this.handleOnChange}
                        />
                        <MyDropdown id="searchCondDropdown" />
                        <SearchIcon className="searchIcon" />
                    </div>
                    <div className="summary">
                        Keyword (Author) : <span className="assignedKeyword">艾爾文</span>
                        <br />
                        Total : <span className="totalNum">9</span>
                    </div>
                    <div className="filterAndSort">
                        <FilterIcon className="filter" />
                        <div className="sort">
                            <div className="sortLabel">Sort by:&ensp;</div>
                            <MyDropdown id="sortDropdown" />
                        </div>
                    </div>
                    {isExploreNormalEnd ? <ExploreResultTable data={exploreData} /> : <ExploreErrorMsg />}
                </div>
            </div>
        );
    }
}

export default ExploreResult;