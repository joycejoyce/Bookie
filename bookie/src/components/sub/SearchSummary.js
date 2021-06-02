export default function SearchSummary(props) {
    console.log("render SearchSummary");
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